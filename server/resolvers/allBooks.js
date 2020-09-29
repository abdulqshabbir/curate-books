const Book = require("../models/Book");

exports.allBooks = async (_, args) => {
  const books = await Book.find();
  if (args.author && !args.genre) {
    return books.filter((b) => b.author === args.author);
  }
  if (!args.author && args.genre) {
    return books.filter((b) => b.genres.includes(args.genre));
  }
  if (args.author && args.genre) {
    return books.filter(
      (b) => b.genres.includes(args.genre) && b.author === args.author
    );
  }
  return books;
};
