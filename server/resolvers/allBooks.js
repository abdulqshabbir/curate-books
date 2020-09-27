const { books } = require("../data/books");

exports.allBooks = (_, args) => {
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
