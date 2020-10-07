import React, { useEffect, useState } from "react";

export const SearchBooks = ({ setPage }) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState();
  const [googleQuery, setGoogleQuery] = useState("");

  useEffect(() => {
    if (googleQuery === "" || googleQuery === undefined) {
      return;
    }
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${googleQuery}&key=AIzaSyBotwXy3y1-6O3MFLS3gef5a21mfeWhhYI`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((res) => {
        let books = res.items;

        const filteredBooks = books.filter((book) => {
          if (
            !book.volumeInfo.title ||
            !book.volumeInfo.authors ||
            !book.volumeInfo.publishedDate ||
            !book.volumeInfo.categories ||
            !book.id
          ) {
            return false;
          } else {
            return true;
          }
        });

        const formattedBooks = filteredBooks.map((book) => ({
          title: book.volumeInfo.title ? book.volumeInfo.title : null,
          author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : null,
          published: book.volumeInfo.publishedDate
            ? book.volumeInfo.publishedDate
            : null,
          genres: book.volumeInfo.categories,
          id: book.id,
        }));
        console.log(formattedBooks);
        return setBooks(formattedBooks);
      })
      .catch((e) => {
        console.log(e);
        setBooks([]);
        return "Something went wrong with your api query";
      });
  }, [googleQuery]);
  if (!books)
    return (
      <div>
        <button onClick={() => setPage("books")}>Show Books</button>
        <button onClick={() => setPage("authors")}>Show Authors</button>
        <button onClick={() => setPage("create-book")}>Create Book</button>
        <button onClick={() => setPage("search-books")}>Search Books</button>
        <input type="text" onChange={(e) => setQuery(e.target.value)}></input>
        <button onClick={() => setGoogleQuery(query)}>Search for Books</button>
      </div>
    );

  if (books) {
    return (
      <div>
        <button onClick={() => setPage("books")}>Show Books</button>
        <button onClick={() => setPage("authors")}>Show Authors</button>
        <button onClick={() => setPage("create-book")}>Create Book</button>
        <button onClick={() => setPage("search-books")}>Search Books</button>
        <input type="text" onChange={(e) => setQuery(e.target.value)}></input>
        <button onClick={() => setGoogleQuery(query)}>Search for Books</button>
        <ul>
          {books.map((b) => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </div>
    );
  }
};
