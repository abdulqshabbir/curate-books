const Apollo = require("apollo-server");
const { v4: uuid } = require("uuid");
const { allBooks } = require("./resolvers/allBooks");
const { addBook } = require("./resolvers/addBook");
const { editAuthor } = require("./resolvers/editAuthor");
const { bookCount } = require("./resolvers/bookCount");
const { authors } = require("./data/authors");
const { books } = require("./data/books");

const ApolloServer = Apollo.ApolloServer;
const gql = Apollo.gql;

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

debugger;
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
