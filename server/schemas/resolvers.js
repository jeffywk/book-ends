const { AuthenticationError } = require('apollo-server-express');
const { User, Book, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        // if user is logged in, get their data
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('books')
                    .populate('orders');
        
                return userData;
            }
    
            throw new AuthenticationError("Not logged in");
        },

        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('books');
        },

        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('books');
        },
        
        books: async (parent, { title }) => {
            const params = {};

            if (title) {
                params.title = {
                    $regex: title
                };
            }

            return await Book.find(params);
        },

        book: async (parent, { _id }) => {
            return await Book.findById(_id);
        },

        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate('orders');

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged in');
        },

        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ books: args.books });
            const line_items = [];
      
            const { products } = await order.populate('books').execPopulate();
      
            for (let i = 0; i < books.length; i++) {
                const book = await stripe.books.create({
                    title: books[i].title,
                    description: books[i].description,
                    images: [`${url}/images/${books[i].image}`]
                });
      
                const price = await stripe.prices.create({
                    book: book.id,
                    unit_amount: books[i].price * 100,
                    currency: 'usd',
                });
        
                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }
      
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });
      
            return { session: session.id };
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },
        
        addOrder: async (parent, { books }, context) => {
            console.log(context);
            if (context.user) {
                const order = new Order({ books });
        
                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
        
                return order;
            }
      
            throw new AuthenticationError('Not logged in');
        },

        addBook: async (parent, args, context) => {
            if (context.user) {
                const book = await Book.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { books: book._id } },
                    { new: true }
                );

                return book;
            }

            throw new AuthenticationError('Not logged in');
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw new AuthenticationError('Not logged in');
        },
          
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        }
    }
};

module.exports = resolvers;