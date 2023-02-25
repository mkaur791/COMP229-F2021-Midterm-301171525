/** File name: db.js
Author Name: Manvir Kaur
Student Id: 301171525
Web app name: Favourite Book List 
*/
console.log(process.env.DATABASE_PASSWORD)
module.exports = {
  // MongoDB Atlas deployment ->
  "URI": `mongodb+srv://admin:${process.env.DATABASE_PASSWORD}@favouritebooklist.012ee.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
};
