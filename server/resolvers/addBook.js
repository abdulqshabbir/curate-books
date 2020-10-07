const { ApolloError } = require("apollo-server-express");
const Book = require("../models/Book");

exports.addBook = async (_, args) => {
  if (isInvalidInput(args)) {
    return provideErrorMessage(args);
  } else {
    const newBook = new Book({ ...args });
    try {
      await newBook.save();
    } catch (e) {
      throw new ApolloError("Invalid arguments");
    }
    return newBook;
  }
};

function isInvalidInput(args) {
  if (!args.title || !args.author || !args.published) {
    return true;
  }
  if (args.genres.length === 0) {
    return true;
  }
  return false;
}

function provideErrorMessage(args) {
  if (!args.title) {
    return {
      message: "Please provide a title",
      field: "title",
    };
  }
  if (!args.author) {
    return {
      message: "Please provide an author",
      field: "author",
    };
  }
  if (!args.published) {
    return {
      message: "Please provide a date of publication",
      field: "published",
    };
  }
  if (!args.genres) {
    return {
      message: "Please provide a genre",
      field: "genres",
    };
  }
}
