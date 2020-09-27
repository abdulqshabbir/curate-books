// const { books } = require("../data/books");
const Book = require("../models/Book");

const { authors } = require("../data/authors");
const { v4: uuid } = require("uuid");

exports.addBook = async (parent, args) => {
  const newBook = new Book({ ...args });
  await newBook.save();
  console.log("new book", newBook);
  // let authorExists =
  //   authors.filter((a) => a.name === newBook.author).length > 0 ? true : false;
  // if (authorExists) {
  //   return newBook;
  // }
  return newBook;
};
