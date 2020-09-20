const Apollo = require("apollo-server");
const { v4: uuid } = require("uuid");

const ApolloServer = Apollo.ApolloServer;
const gql = Apollo.gql;

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

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
    editAuthor(name: String!, setBornTo: Int!): Author!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_, args) => {
      if (args.author && !args.genre) {
        return books.filter((b) => b.author === args.author);
      }
      if (!args.author && args.genre) {
        return books.filter((b) => b.genres.includes(args.genre));
      }
      if (args.author && args.genre) {
        return books.filter(
          (b) => b.genres.includes(args.genre) && b.author === args.author
        );
      }
      return books;
    },
    allAuthors: () => authors,
  },
  Mutation: {
    addBook: (parent, args) => {
      let newBook = { ...args };
      books.concat(newBook);

      let authorExists =
        authors.filter((a) => a.name === newBook.name).length > 0
          ? true
          : false;
      if (authorExists) {
        return newBook;
      } else {
        authors.concat({ name: newBook.name, id: uuid() });
        return newBook;
      }
    },
    editAuthor: (parent, args) => {
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
    },
  },
  Author: {
    bookCount: (parent) => {
      const authorBooks = books.filter((b) => parent.name === b.author);
      return authorBooks.length;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
