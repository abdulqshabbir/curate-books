import { useQuery, gql } from "@apollo/client";
import React from "react";
import "./App.css";

const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author
      published
      genres
    }
  }
`;

function App() {
  const books = useQuery(ALL_BOOKS);

  if (books.loading) {
    return <div> loading... </div>;
  }

  if (books.data) {
    return books.data.allBooks.map((b) => <li key={b.id}>{b.title}</li>);
  }
}

export default App;
