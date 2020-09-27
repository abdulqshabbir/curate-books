const { books } = require("../data/books");

exports.bookCount = (parent) => {
  const authorBooks = books.filter((b) => parent.name === b.author);
  return authorBooks.length;
};
