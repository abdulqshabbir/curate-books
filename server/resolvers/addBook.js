const Book = require("../models/Book");

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
