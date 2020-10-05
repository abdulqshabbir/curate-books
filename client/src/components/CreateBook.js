import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

export const CreateBook = ({ setPage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);

  const [createBook, { data }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=harry\npotter&key=AIzaSyBotwXy3y1-6O3MFLS3gef5a21mfeWhhYI`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.items);
        return setBooks(result);
      });
  }, []);

  return (
    <div>
      <button onClick={() => setPage("books")}>Show Books</button>
      <button onClick={() => setPage("authors")}>Show Authors</button>
      <button onClick={() => setPage("create-book")}>Create Book</button>
      <button onClick={() => setPage("search-books")}>Search Books</button>
      <form onSubmit={(e) => submitForm(e)}>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Author: </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <label>Published: </label>
        <input
          type="text"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        />
        <br />
        <label>Add Genre: </label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <br />
        <p>{genres.join(" ")}</p>
        <br />
        <button onClick={(e) => addGenre(e)}>Add Genre</button>
        <br />
        <label>Genres: </label>
        <br />
        <button>Create Book</button>
        <ErrorMesage response={data} />
      </form>
    </div>
  );

  function submitForm(e) {
    e.preventDefault();
    // make graphql request to ADD_BOOK and refetch authors and books
    createBook({
      variables: { title, author, published: parseInt(published), genres },
    });

    // clear input fields from state
    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres([]);
    setGenre("");
  }

  function addGenre(e) {
    e.preventDefault();
    setGenres(genres.concat(genre));
    setGenre("");
  }
};

const ErrorMesage = ({ response: data }) => {
  if (data === undefined) {
    return null;
  }
  if (data.addBook.__typename === "CreateBookFailed") {
    return <p>{data.addBook.message}</p>;
  }
  if (data.addBook.__typename === "Book") {
    return <p>{`Book with name ${data.addBook.title} was just added!`}</p>;
  }
  return null;
};
