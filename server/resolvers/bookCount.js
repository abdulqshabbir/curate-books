const Book = require("../models/Book");

exports.bookCount = async (parent) => {
  // parent is the author type requesting number of books to be resolved

  const books = await Book.find();
  const booksByAuthor = books.filter((b) => parent.name === b.author);
  return booksByAuthor;
};
