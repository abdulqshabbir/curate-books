const { books } = require("../data/books");
const { authors } = require("../data/authors");
const { v4: uuid } = require("uuid");

exports.addBook = (parent, args) => {
  let newBook = { ...args, id: uuid() };
  books.concat(newBook);
  let authorExists =
    authors.filter((a) => a.name === newBook.author).length > 0 ? true : false;
  if (authorExists) {
    return newBook;
  } else {
    authors.concat({ name: newBook.name, id: uuid() });
    return newBook;
  }
};
