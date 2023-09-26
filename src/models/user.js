const mongoose = require('mongoose');

const user = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
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

module.exports = mongoose.model('user', user);