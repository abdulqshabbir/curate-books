import { QueryResult } from "@apollo/client";
import React from "react";
import { ALL_BOOKS_DATA } from "../queries/ALL_BOOKS";
import { PageRoute } from "../types/PageRoute";
import { ToastNotification } from './ToastNotification'

interface IProps {
  booksQuery: QueryResult<ALL_BOOKS_DATA, Record<string, any>>;
  setPage: React.Dispatch<React.SetStateAction<PageRoute>>;
}

const sampleNotification = {
  id: 1,
  type: 'success',
  title: 'Title',
  description: 'The operation was a success'
}

export const Books = ({ booksQuery, setPage }: IProps) => {
  const {loading, error, data} = booksQuery
  if (loading) {
    return <div>Loading...</div>;
  } 
  if (error || data === undefined ) {
    return <div>Error fetching books...</div>
  } 
  else {
    return (
      <div>
        <button onClick={() => setPage("books")}>Show Books</button>
        <button onClick={() => setPage("authors")}>Show Authors</button>
        <button onClick={() => setPage("create-book")}>Create Book</button>
        <button onClick={() => setPage("search-books")}>Search Books</button>
        <h2>Books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {data.allBooks.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      <ToastNotification notification={sampleNotification} position={'top-right'} />
      </div>
    );
  }
};

