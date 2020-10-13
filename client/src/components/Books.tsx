import { QueryResult } from "@apollo/client";
import React from "react";
import { ALL_BOOKS_DATA } from "../queries/ALL_BOOKS";
import { PageRoute } from "../types/PageRoute";
import { NavigationBar } from "./NavigationBar";
import { BookCard } from './BookCard'
import { Book } from "../types/Book";

interface IProps {
  booksQuery: QueryResult<ALL_BOOKS_DATA, Record<string, any>>,
  setPage: React.Dispatch<React.SetStateAction<PageRoute>>,
  setShowBook: React.Dispatch<React.SetStateAction<Book | null>>
}

export const Books = ({ booksQuery, setPage, setShowBook }: IProps) => {
  const {loading, error, data} = booksQuery
  if (loading) {
    return <div>Loading...</div>;
  } 
  if (error || data === undefined ) {
    return <div>Error fetching books...</div>
  } 
  else {
    return (
      <>
        <NavigationBar setPage={setPage} />
        <div className="books-container">
          {
            data.allBooks.map(b => 
              <BookCard
                key={b.id}
                book={b}
                setPage={setPage}
                setShowBook={setShowBook}
              />
            )
          }
        </div>
      </>
    );
  }
};

