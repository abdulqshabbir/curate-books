import React, { useState, useEffect } from "react";

export const CreateBook = ({ setPage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  useEffect(() => {
    console.log(title);
  }, [title]);
  return (
    <div>
      <button onClick={() => setPage("books")}>Show Books</button>
      <button onClick={() => setPage("authors")}>Show Authors</button>
      <button onClick={() => setPage("create-book")}>Create Book</button>

      <form>
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
          onChange={(e) => published(e.target.value)}
        />
      </form>
    </div>
  );
};
