// apollo imports
const Apollo = require("apollo-server");
const ApolloServer = Apollo.ApolloServer;
const gql = Apollo.gql;

// uuid
const { v4: uuid } = require("uuid");

// resolvers
const { allBooks } = require("./resolvers/allBooks");
const { addBook } = require("./resolvers/addBook");
const { editAuthor } = require("./resolvers/editAuthor");
const { bookCount } = require("./resolvers/bookCount");
const { authors } = require("./data/authors");
const { books } = require("./data/books");

// mongodb and mongoose
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
    editedAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: allBooks,
    allAuthors: () => authors,
  },
  Mutation: {
    addBook: addBook,
    editedAuthor: editAuthor,
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
