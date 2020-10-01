import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { ErrorMessage } from "./ErrorMessage";

export const CreateBook = ({ setPage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(true);
  }, [error]);

  const [createBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  return (
    <div>
      <button onClick={() => setPage("books")}>Show Books</button>
      <button onClick={() => setPage("authors")}>Show Authors</button>
      <button onClick={() => setPage("create-book")}>Create Book</button>
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
        <button onClick={(e) => addGenre(e)}>Add Genre</button>
        <br />
        <label>Genres: </label>
        {showError ? <ErrorMessage errorMesage={error} /> : null}
        <br />
        <button>Create Book</button>
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
