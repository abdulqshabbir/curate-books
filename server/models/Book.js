const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  published: {
    type: String,
    required: true,
  },
  genres: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  googleBookId: {
    type: String,
  },
});

module.exports = mongoose.model("Book", schema);
