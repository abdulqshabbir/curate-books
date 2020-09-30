// apollo imports
const Apollo = require("apollo-server");
const ApolloServer = Apollo.ApolloServer;
const gql = Apollo.gql;

// my resolvers
const { allBooks } = require("./resolvers/allBooks");
const { addBook } = require("./resolvers/addBook");
const { addAuthor } = require("./resolvers/addAuthor");
const { editWhenAuthorIsBorn } = require("./resolvers/editAuthor");
const { bookCount } = require("./resolvers/bookCount");
const { authors } = require("./data/authors");
const { books } = require("./data/books");

// database models
const Book = require("./models/Book");
const Author = require("./models/Author");

// database connection
const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://test:test@cluster0.uoynh.gcp.mongodb.net/reading-list?retryWrites=true&w=majority";

console.log("connecting to...", MONGO_URI);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to MongoDB"))
  .catch((e) => console.log("error connecting to MongoDB", e.message));

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book!
    addAuthor(name: String!, born: Int): Author
    editWhenAuthorIsBorn(name: String!, born: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find();
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find();
      return authors.length;
    },
    allBooks: allBooks,
    allAuthors: async () => {
      const authors = await Author.find();
      return authors;
    },
  },
  Mutation: {
    addBook: addBook,
    addAuthor: addAuthor,
    editWhenAuthorIsBorn: editWhenAuthorIsBorn,
  },
  Author: {
    bookCount: bookCount,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
