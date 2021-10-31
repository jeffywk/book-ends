const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;