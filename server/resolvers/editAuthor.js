const Author = require("../models/Author");

exports.editWhenAuthorIsBorn = async (_, args) => {
  const authorExists = Author.exists({ name: args.name });
  if (!authorExists) return null;
  try {
    const author = await Author.findOne({ name: args.name });
    author.born = args.born;

    await author.save();

    return author.toObject();
  } catch (e) {
    console.log(e);
  }
};
