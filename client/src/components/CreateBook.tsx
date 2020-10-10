// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { PageRoute } from "../types/PageRoute";
import { ADD_BOOK_DATA, ADD_BOOK_VARS } from "../queries/ADD_BOOK";

interface IProps {
  setPage: React.Dispatch<React.SetStateAction<PageRoute>>
}

export const CreateBook = ({ setPage }: IProps) => {
  // field states
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [published, setPublished] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);

  // notification state
  const [showNotification, setShowNotification] = useState<boolean>(false)

  // graphql requests
  const [createBook, { data, error, loading }] = useMutation<ADD_BOOK_DATA, ADD_BOOK_VARS>(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  if (error) {
    return (
      <div>
        <button onClick={() => setPage('books')}>Show Books</button>
        <button onClick={() => setPage("authors")}>Show Authors</button>
        <button onClick={() => setPage("create-book")}>Create Book</button>
        <button onClick={() => setPage("search-books")}>Search Books</button>
        <p>There was an error creating the book...</p>
      </div>
    )
  }
  if (loading) {
    return (
      <div>
        <button onClick={() => setPage('books')}>Show Books</button>
        <button onClick={() => setPage("authors")}>Show Authors</button>
        <button onClick={() => setPage("create-book")}>Create Book</button>
        <button onClick={() => setPage("search-books")}>Search Books</button>
        <p>Loading your new book...</p>
      </div>
    )
  }
  return (
    <div>
      <button onClick={() => setPage('books')}>Show Books</button>
      <button onClick={() => setPage("authors")}>Show Authors</button>
      <button onClick={() => setPage("create-book")}>Create Book</button>
      <button onClick={() => setPage("search-books")}>Search Books</button>
      <form onSubmit={(e) => submitForm(e, setShowNotification)}>
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
        {showNotification && data && <Notification data={data} />}
      </form>
    </div>
  );

  function submitForm(e: React.FormEvent<HTMLFormElement>, setShowNotification: React.Dispatch<React.SetStateAction<boolean>>) {
    e.preventDefault();
    // make graphql request to ADD_BOOK and refetch authors and books
    createBook({
      variables: { title, author, published: parseInt(published), genres },
    });

    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)

    // clear input fields from state
    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres([]);
    setGenre("");
  }

  function addGenre(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setGenres(genres.concat(genre));
    setGenre("");
  }
};

interface IPropsNotification {
  data: ADD_BOOK_DATA
}

const Notification = ({data}: IPropsNotification) => {
  if (data.__typename === 'CreateBookFailed'){
    return <p>{data.message}</p>;
  }
  if (data.__typename === "Book") {
    return <p>{`Book with name ${data.title} was just added!`}</p>;
  }
  return null;
};
