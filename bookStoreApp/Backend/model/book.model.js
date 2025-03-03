const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: { type: String, required: false }, // Author or Book Name
  image: { type: String, required: false }, // URL to the book image
  introduction: { type: String, required: false }, // Brief introduction about the book
  title: { type: String, required: false }, // Full title of the book
  category: { type: String, required: false }, // Category of the book (e.g., Fiction, Non-Fiction)
  price: { type: Number, required: false }, // Price of the book
  isbn: { type: String, required: false }, // ISBN number
  publisher: { type: String, required: false }, // Publisher name
  printingDate: { type: Date, required: false }, // Printing date
  description: { type: String, required: false }, // Detailed description of the book
  author: { type: String, required: false },
});

// Create the Book model using the updated schema
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
