const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const books = require('../models/books');
const cart = require('../models/cart')


const addBook = async (req, res) => {
    try{
        let token = req.headers.cookie?.split('=')[1];
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(!verify){
            return res.status(401).json({
                status: 401,
                message: 'Invalid token'
                
            }) 
        }

        let {name, author, genre, publication_year, price} = req.body;
       
        let bookData = {
            _id: new mongoose.Types.ObjectId(),
            name,
            price,
            author,
            genre,
            publication_year,
            added_by: verify.email
        }

        const book = new books( bookData )
        var result = await book.save();
      
        return res.status(200).json({
            status: 200,
            message: 'successfully created book',
            result: result
        })

    }catch(err){
        console.log("error====================================================", err)
        return res.status(300).json({
            status: 300,
            message: 'error adding book',
            error: err
        })
    }
}

const addToCart = async(req, res) => {
    let { book_name, count, price} = req.body;
    try{
        let token = req.headers.token;
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(!verify){
            return res.status(401).json({
                status: 401,
                message: 'Invalid token'
                
            }) 
        }
        let payload = jwt.decode(token, process.JWT_SECRET);

        let cartData = {
            _id: new mongoose.Types.ObjectId(),
            email: payload.email,
            book_name,
            count,
            total_price: price*count
            
            
        }
        const carts = new cart( cartData )
        var result = await carts.save();
        return res.status(200).json({
            status: 200,
            message: 'added to cart',
            result: result
        })

    }catch(err){
        return res.status(300).json({
            status: 300,
            message: 'Internal server error',
            error: err
        })
    }
}

const getCartByEmail = async (req, res) => {
    
    try{
        let token = req.headers.token;
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(!verify){
            return res.status(401).json({
                status: 401,
                message: 'Invalid token'
                
            }) 
        }
        let payload = jwt.decode(token, process.JWT_SECRET);
        let email = payload.email;

        let cartDetails = await cart.findAll({email: email})
     
        return res.status(200).json({
            status: 200,
            message: 'fetched all orders',
            result: cartDetails
        })

    }catch(err){
        return res.status(300).json({
            status: 300,
            message: 'Internal server error',
            error: err
        })
    }
}

const updateBook = async (req, res) => {
    
    try{
        let token = req.headers.cookie?.split('=')[1];
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(!verify){
            return res.status(401).json({
                status: 401,
                message: 'Invalid token'
                
            }) 
        }

        let {book_id , ...updatedBookData} = req.body;
       
       

        const book = new books( updatedBookData )
        let result = await books.findOneAndUpdate({_id: book_id},{...updatedBookData}, {upsert: true, returnOriginal: false });
      
        return res.status(200).json({
            status: 200,
            message: 'successfully updated book',
            result: result
        })

    }catch(err){
        console.log("error=================================", err)
        return res.status(300).json({
            status: 300,
            message: 'error updating boook',
            error: err
        })
    }
}

const deleteBook = async (req, res) => {
    let book_id = req.body.book_id;
    try{
        let token = req.headers.cookie?.split('=')[1];
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!verify){
            return res.status(401).json({
                status: 401,
                message: 'Invalid token'
                
            }) 
        }

        let email = verify.email;
        let bookData = await books.findOne({_id: book_id})
        if(bookData.email != email){
            return res.status(403).json({
                status: 403,
                message: 'Book can only be deleted by the person who added it'
            })
        }

        let result = await books.deleteOne({_id: book_id})

    }catch(err){
        return res.status(300).json({
            status: 300,
            message: 'deleted book',
            error: err
        })
    }
}

const listAllBooks = async (req, res) => {
    try{
        let result = await books.find()
        return res.status(200).json({
            status: 200,
            result: result
        })
    }catch(err){
        console.log("error============", err)
        return res.status(300).json({
            status: 300,
            message: 'error while fetching all books',
            error: err
        })
    }
}

const getBooksDetailsById = async (req, res) => {
    let book_id = req.body.book_id
    try{
        
        let bookDetails = await books.findOne({_id: book_id})
     
        return res.status(200).json({
            status: 200,
            message: 'fetched book details',
            result: bookDetails 
        })
    }catch(err){
        return res.status(300).json({
            status: 300,
            message: 'error while getiing details of a book',
            error: err
        })
    }
}
module.exports = { addBook, updateBook, deleteBook, listAllBooks, getBooksDetailsById, addToCart, getCartByEmail }