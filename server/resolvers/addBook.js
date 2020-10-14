const { ApolloError } = require("apollo-server-express");
const Book = require("../models/Book");

exports.addBook = async (_, args) => {
  if (isInvalidInput(args)) {
    return provideErrorMessage(args);
  }
  const bookExists = await bookAlreadyExists(args);
  if (bookExists) {
    return {
      message: `The Book, ${args.title}, already exists in your collection!`,
    };
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

async function bookAlreadyExists(args) {
  const googleBookId = args.googleBookId;
  const bookExists = await Book.exists({ googleBookId });

  if (bookExists) return true;

  return false;
}

function isInvalidInput(args) {
  if (
    !args.title ||
    !args.author ||
    !args.published ||
    !args.description ||
    !args.image ||
    !args.googleBookId
  ) {
    return true;
  }
  if (!args.genres || args.genres.length === 0) {
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
  if (!args.description) {
    return {
      message: "Please provide a description",
      field: "description",
    };
  }
  if (!args.image) {
    return {
      message: "Please provide an image",
      field: "image",
    };
  }

  if (!args.googleBookId) {
    return {
      message: "No google book id provided.",
      field: "googleBookId",
    };
  }
}
