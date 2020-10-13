import { useQuery } from "@apollo/client";
import React, { useState } from "react";

//components
import { Authors } from "./components/Authors";
import { Books } from "./components/Books";
import { CreateBook } from "./components/CreateBook";
import { SearchBooks } from "./components/SearchBooks";
import { ShowBook } from './components/ShowBook'

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
import { Book } from "./types/Book";

function App() {
  const [page, setPage] = useState<PageRoute>('search-books');
  const authorsQuery = useQuery<ALL_AUTHORS_DATA>(ALL_AUTHORS);
  const booksQuery = useQuery<ALL_BOOKS_DATA>(ALL_BOOKS);
  const [showBook, setShowBook] = useState<Book | null>(null);

  if (page === 'authors') {
    return (
      <div>
        <Authors authorsQuery={authorsQuery} setPage={setPage} />)
      </div>
    );
  } else if (page === 'books') {
    return (
      <div>
        <Books 
          booksQuery={booksQuery} 
          setPage={setPage}
          setShowBook={setShowBook}
        />
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
        <SearchBooks 
          setPage={setPage}
          setShowBook={setShowBook}
        />
      </div>
    );
  } else if (page === 'show-book') {
    return(
      <div>
        <ShowBook book={showBook} />
      </div>
    )
  }
  return null;
}

export default App;
