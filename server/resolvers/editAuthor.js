const { authors } = require("../data/authors");

exports.editAuthor = (parent, args) => {
  let editedAuthor = {};
  let authorExists =
    authors.filter((author) => author.name === args.name).length > 0
      ? true
      : false;

  if (!authorExists) return null;

  authors = authors.map((author) => {
    if (author.name === args.name) {
      editedAuthor = { ...author, name: args.name, born: args.setBornTo };
      return editedAuthor;
    } else {
      return author;
    }
  });
  return editedAuthor;
};
