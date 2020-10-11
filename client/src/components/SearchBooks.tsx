// eslint-disable-next-line
import { format } from "path";
import React, { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { PageRoute } from "../types/PageRoute";
import { BookCard } from "./BookCard";
import { NavigationBar } from "./NavigationBar";

interface IProps {
  setPage: React.Dispatch<React.SetStateAction<PageRoute>>
}

interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string,
    authors: [string],
    publishedDate: number,
    categories: [string],
    description : string,
    imageLinks: {
      thumbnail: string
    }
  };
}

export const SearchBooks = ({ setPage }: IProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  console.log(books)
  const [query, setQuery] = useState<string>('');
  const [googleQuery, setGoogleQuery] = useState<string>('');

  function bookHasRequiredFields(book: GoogleBook) {
    if (
        !book.volumeInfo.title ||
        !book.volumeInfo.authors ||
        !book.volumeInfo.publishedDate ||
        !book.volumeInfo.categories ||
        !book.volumeInfo.description ||
        !book.volumeInfo.imageLinks.thumbnail ||
        !book.id
    ) {return false}
    return true
  }

  useEffect(() => {
    if (googleQuery === "" || googleQuery === undefined) {
      return;
    }
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${googleQuery}&key=AIzaSyBotwXy3y1-6O3MFLS3gef5a21mfeWhhYI`)
      .then((res) => res.json())
      .then((res) => {
        let books = res.items;
        const filteredBooks = books.filter((book: GoogleBook) => bookHasRequiredFields(book));
        return filteredBooks
      })
      .then(filteredBooks => {
        const formattedBooks: Book[] = filteredBooks.map((book: GoogleBook) => ({
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors,
          published: book.volumeInfo.publishedDate,
          genres: book.volumeInfo.categories,
          description:book.volumeInfo.description,
          image: book.volumeInfo.imageLinks.thumbnail,
          id: book.id,
        }));
        setBooks(formattedBooks);
        console.log(books)
      })
      .catch((e) => {
        setBooks([]);
        throw new Error("Something went wrong when fetching google books")
      });
  }, [googleQuery]);
  if (!books)
    return (
      <div>
        <NavigationBar setPage={setPage}/>
        <input type="text" onChange={(e) => setQuery(e.target.value)}></input>
        <button onClick={() => setGoogleQuery(query)}>Search for Books</button>
      </div>
    );
  else {
    return (
      <div>
        <NavigationBar setPage={setPage}/>
        <input type="text" onChange={(e) => setQuery(e.target.value)}></input>
        <button onClick={() => setGoogleQuery(query)}>Search for Books</button>
        <ul>
          {books.map((b) => (
            <BookCard book={b} key={b.id}/>
          ))}
        </ul>
      </div>
    );
  }
};
