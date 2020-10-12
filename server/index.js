// apollo imports
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

// my resolvers
const { allBooks } = require("./resolvers/allBooks");
const { addBook } = require("./resolvers/addBook");
const { addAuthor } = require("./resolvers/addAuthor");
const { editWhenAuthorIsBorn } = require("./resolvers/editAuthor");
const { bookCount } = require("./resolvers/bookCount");

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

  union BookResult = Book | CreateBookFailed

  type Book {
    title: String!
    author: String!
    published: String!
    genres: [String]!
    description: String!
    image: String!
    googleBookId: String
    id: ID!
  }

  type CreateBookFailed {
    message: String!
    field: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }
  type Mutation {
    addBook(
      title: String
      author: String
      published: String
      genres: [String]
      description: String
      image: String
      googleBookId: String
    ): BookResult!
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
  BookResult: {
    __resolveType: (obj) => {
      if (obj.title) return "Book";
      if (obj.message) return "CreateBookFailed";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(cors());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at 4000`);
});
