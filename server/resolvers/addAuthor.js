const { ApolloError } = require("apollo-server-express");
const Author = require("../models/Author");

exports.addAuthor = async (parent, args) => {
  const newAuthor = new Author({ ...args });
  try {
    await newAuthor.save();
  } catch (e) {
    console.log(e);
    throw new ApolloError("Author could not be added.");
  }
  return newAuthor;
};
