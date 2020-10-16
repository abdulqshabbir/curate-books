const { ApolloError } = require("apollo-server-express");
const Book = require("../models/Book");

exports.deleteBook = async (parent, args) => {
  const bookExists = await Book.exists({ googleBookId: args.googleBookId });

  if (!bookExists) {
    return {
      message: "Book does not exist in database.",
    };
  }

  try {
    let book = await Book.findOneAndDelete({ googleBookId: args.googleBookId });
    console.log("book value", book);
    return book;
  } catch (e) {
    console.log(e);
    throw new ApolloError("Book could not be deleted for unkown reasons.");
  }
};
