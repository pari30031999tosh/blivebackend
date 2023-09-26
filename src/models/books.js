const mongoose = require('mongoose');

const books = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    price: {
        type: Number
    },
    publication_year: {
        type: String
    },
    added_by: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    
    
    
})

module.exports = mongoose.model('books', books);