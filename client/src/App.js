import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import { Authors } from "./components/Authors";
import { Books } from "./components/Books";
import { CreateBook } from "./components/CreateBook";
import "./App.css";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

function App() {
  const [page, setPage] = useState("create-book");
  const authorsQuery = useQuery(ALL_AUTHORS);
  const booksQuery = useQuery(ALL_BOOKS);

  if (page === "authors") {
    return (
      <div>
        <Authors authorsQuery={authorsQuery} setPage={setPage} />)
      </div>
    );
  } else if (page === "books") {
    return (
      <div>
        <Books booksQuery={booksQuery} setPage={setPage} />
      </div>
    );
  } else if (page === "create-book") {
    return (
      <div>
        <CreateBook setPage={setPage} />
      </div>
    );
  }
  return null;
}

export default App;
