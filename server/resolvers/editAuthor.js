const Author = require("../models/Author");

exports.editWhenAuthorIsBorn = async (_, args) => {
  try {
    const authorExists = Author.exists({ name: args.name });
    if (!authorExists) return null;

    const author = await Author.findOne({ name: args.name });
    author.born = args.born;

    await author.save();

    return author.toObject();
  } catch (e) {
    console.log(e);
  }
};
