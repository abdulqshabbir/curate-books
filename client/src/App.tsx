import { useQuery } from "@apollo/client";
import React, { useState } from "react";

//components
import { Authors } from "./components/Authors";
import { Books } from "./components/Books";
import { CreateBook } from "./components/CreateBook";
import { SearchBooks } from "./components/SearchBooks";

// semantic ui css theme
import 'semantic-ui-css/semantic.min.css'

// my custom css file
import "./App.css";

//queries
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

//types
import { ALL_AUTHORS_DATA} from './queries/ALL_AUTHORS'
import { ALL_BOOKS_DATA } from './queries/ALL_BOOKS'
import { PageRoute } from './types/PageRoute'

function App() {
  const [page, setPage] = useState<PageRoute>('search-books');
  const authorsQuery = useQuery<ALL_AUTHORS_DATA>(ALL_AUTHORS);
  const booksQuery = useQuery<ALL_BOOKS_DATA>(ALL_BOOKS);

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