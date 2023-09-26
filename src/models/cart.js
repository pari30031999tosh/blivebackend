const mongoose = require('mongoose');

const cart = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: {
        type: String
    },
    book_name: {
        type: String
    },
    total_price: {
        type: Number
    },
    count: {
        type: Number
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

module.exports = mongoose.model('cart', cart);