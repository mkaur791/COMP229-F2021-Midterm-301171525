/** File name: books.js
Author Name: Manvir Kaur
Student Id: 301171525
Web app name: Favourite Book List 
*/

let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
