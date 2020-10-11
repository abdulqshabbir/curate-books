import { QueryResult } from "@apollo/client";
import React from "react";
import { ALL_BOOKS_DATA } from "../queries/ALL_BOOKS";
import { PageRoute } from "../types/PageRoute";
import { NavigationBar } from "./NavigationBar";

interface IProps {
  booksQuery: QueryResult<ALL_BOOKS_DATA, Record<string, any>>;
  setPage: React.Dispatch<React.SetStateAction<PageRoute>>;
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
        <NavigationBar setPage={setPage} />
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
      </div>
    );
  }
};

