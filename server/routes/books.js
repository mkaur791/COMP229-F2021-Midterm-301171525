/** File name: books.js
Author Name: Manvir Kaur
Student Id: 301171525
Web app name: Favourite Book List 
*/


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details',{title:'Add Book',books:''});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    const {title,price,author,genre} = req.body;
    let newBook = book({
      Title: title,
      Price: price,
      Author: author,
      Genre: genre
    })

    // create a new book
    book.create(newBook ,(err,req,next)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            // refresh the book list
            res.redirect('/books');
        }
    })
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  book.findById(id, (err,bookToEdit,next) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            // displaying the edit view with the book data
            res.render('books/details',{title:'Edit Book',books: bookToEdit});
        }
    })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  const {title,price,author,genre} = req.body
  let updatedBook = book({
    "_id": id,
    Title: title,
    Price: price,
    Author: author,
    Genre: genre
  })

  book.updateOne({_id:id} ,updatedBook ,(err) =>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      // refresh the book list
      res.redirect('/books');
    }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  book.remove({_id: id} , (err) =>{
      if(err){
          console.log(err);
          res.end(err);
      }
      else{
          res.redirect('/books');
      }
  })
});


module.exports = router;
