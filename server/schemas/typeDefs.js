const { gql } = require('apollo-server-express');

const typeDefs = gql `
    
    type Book {
        _id: ID
        title: String
        description: String
        image: String
        price: Float
    }

    type Order {
        _id: ID
        books: [Book]
    }

    type User {
        _id: ID
        username: String
        email: String
        orders: [Order]
        books: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Checkout {
        session: ID
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        books(title: String): [Book]
        book(_id: ID!): Book
        order(_id: ID!): Order
        checkout(books: [ID]!): Checkout
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addOrder(books: [ID]!): Order
        addBook(title: String, description: String, image: String, price: Float): Book
        updateUser(username: String, email: String, password: String): User
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;