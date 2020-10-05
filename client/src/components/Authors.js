import React from "react";
export const Authors = ({ authorsQuery, setPage }) => {
  if (authorsQuery.loading) {
    return <div>Loading...</div>;
  } else {
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
            {authorsQuery.data.allAuthors.map((a) => (
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
