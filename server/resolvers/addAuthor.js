const Author = require("../models/Author");
const { v4: uuid } = require("uuid");

exports.addAuthor = async (parent, args) => {
  const newAuthor = new Author({ ...args });
  try {
    await newAuthor.save();
  } catch (e) {
    console.log(e);
  }
  return newAuthor;
};
