import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Authors } from "./components/Authors";
import { Books } from "./components/Books";
import { CreateBook } from "./components/CreateBook";
import { SearchBooks } from "./components/SearchBooks";
import "./App.css";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

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
  } else if (page === "search-books") {
    return (
      <div>
        <SearchBooks setPage={setPage} />
      </div>
    );
  }
  return null;
}

export default App;
