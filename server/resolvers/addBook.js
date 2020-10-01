const { UserInputError } = require("apollo-server");
const Book = require("../models/Book");

exports.addBook = async (parent, args) => {
  if (!args.title || !args.author || !args.published) {
    throw new UserInputError("Provide all fields for creating a book.");
  }
  const newBook = new Book({ ...args });
  await newBook.save();
  return newBook;
};
