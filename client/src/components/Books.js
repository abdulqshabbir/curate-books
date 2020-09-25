import React from "react";
export const Books = ({ booksQuery, setPage }) => {
  if (booksQuery.loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <button onClick={() => setPage("books")}>Show Books</button>
        <button onClick={() => setPage("authors")}>Show Authors</button>
        <button onClick={() => setPage("create-book")}>Create Book</button>
        <h2>Books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksQuery.data.allBooks.map((b) => (
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
