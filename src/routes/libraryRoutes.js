const express = require('express');
const router = express.Router();

const libraryController = require('../controllers/libraryController')

router.post('/addbook', libraryController.addBook);
router.put('/updatebook', libraryController.updateBook);
router.post('/deletebook', libraryController.deleteBook)
router.get('/listallbooks', libraryController.listAllBooks)
router.post('/getbookdetails', libraryController.getBooksDetailsById)
router.post('/addtocart', libraryController.addToCart)
router.post('/getcartbyemail', libraryController.getCartByEmail)

module.exports = router;