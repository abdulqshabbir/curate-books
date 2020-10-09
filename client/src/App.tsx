import { useQuery } from "@apollo/client";
import React, { useState } from "react";

//components
import { Authors } from "./components/Authors";
import { Books } from "./components/Books";
import { CreateBook } from "./components/CreateBook";
import { SearchBooks } from "./components/SearchBooks";

//css
import "./App.css";

//queries
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

//types
import { AuthorsData} from './types/AuthorData'
import { BooksData} from './types/BookData'
import { PageRoute } from './types/PageRoute'

function App() {
  const [page, setPage] = useState<PageRoute>('books');
  const authorsQuery = useQuery<AuthorsData>(ALL_AUTHORS);
  const booksQuery = useQuery<BooksData>(ALL_BOOKS);

  if (page === 'authors') {
    return (
      <div>
        <Authors authorsQuery={authorsQuery} setPage={setPage} />)
      </div>
    );
  } else if (page === 'books') {
    return (
      <div>
        <Books booksQuery={booksQuery} setPage={setPage} />
      </div>
    );
  } else if (page === 'create-book') {
    return (
      <div>
        <CreateBook setPage={setPage} />
      </div>
    );
  } else if (page === 'search-books') {
    return (
      <div>
        <SearchBooks setPage={setPage} />
      </div>
    );
  }
  return null;
}

export default App;
