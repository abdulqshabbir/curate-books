import { QueryResult } from "@apollo/client";
import React from "react";
import { ALL_AUTHORS_DATA } from "../queries/ALL_AUTHORS";
import { PageRoute } from "../types/PageRoute";

export const Authors = ({ authorsQuery, setPage }: IProps) => {
  let { loading, error, data } = authorsQuery
  if (loading) {
    return <div>Loading...</div>;
  }
  else if (error || data === undefined) {
    return <div>Error fetching authors...</div>
  } 
  else {
    return (
      <div>
        <button onClick={() => setPage("books")}>Show Books</button>
        <button onClick={() => setPage("authors")}>Show Authors</button>
        <button onClick={() => setPage("create-book")}>Create Book</button>
        <button onClick={() => setPage("search-books")}>Search Books</button>
        <h2>Authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
interface IProps {
  authorsQuery: QueryResult<ALL_AUTHORS_DATA, Record<string, any>>;
  setPage: React.Dispatch<React.SetStateAction<PageRoute>>;
}
