// eslint-disable-next-line
import React, { useEffect, useState } from "react";

// typescript types
import { Book } from "../types/Book";
import { PageRoute } from "../types/PageRoute";

// react components
import { BookCard } from "./BookCard";
import { NavigationBar } from "./NavigationBar";
import { Button, Input, Loader } from 'semantic-ui-react'

// css
import './SearchBooks.css'

interface IProps {
  setPage: React.Dispatch<React.SetStateAction<PageRoute>>
}

interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string,
    authors: string[],
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
  const [query, setQuery] = useState<string>('');
  const [googleQuery, setGoogleQuery] = useState<string>('');

  let [render, setRender] = useState< 'loading'| 'books' | null>(null);
  let BooksOrLoadingSpinner = null

  useEffect(() => {
    if (googleQuery === "" || googleQuery === undefined) {
      return;
    }
    setRender('loading')
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${googleQuery}&key=AIzaSyBotwXy3y1-6O3MFLS3gef5a21mfeWhhYI`)
      .then(res => res.json())
      .then(res => filterGoogleBooksByRequiredFields(res))
      .then(filteredBooks => formatGoogleBooks(filteredBooks))
      .then(filteredBooks=> setBooks(filteredBooks))
      .then(() => setRender('books'))
      .catch((e) => setBooks([]))
  }, [googleQuery])

  if (render === null) {
    BooksOrLoadingSpinner = null
  } else if (render === 'loading') {
    BooksOrLoadingSpinner = <Loader active />
  } else {
    BooksOrLoadingSpinner = books.map(b => <BookCard book={b} key={b.id} />)
  }
  return (
    <div>
      <NavigationBar setPage={setPage}/>
      <div className="search-field-container">
        {/* <div className="ui input">
          <input
            className="search-books-input"
            type="text"
            placeholder="Search for book by author, title, etc."
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setQuery(query)
              }
            }}
          >
          </input>
        </div> */}
        <Input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for book by author, title, etc."
          size="large"
          className="search-books-input"
          onKey
        ></Input>
        <Button
          className="search-books-button"
          onClick={() => setGoogleQuery(query)}
          >
            Search for Books
        </Button>
      </div>
      <div className="books-container">
        {BooksOrLoadingSpinner}
      </div>
    </div>
  );
};


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

function filterGoogleBooksByRequiredFields(res: any) {
  let books = res.items;
  const filteredBooks = books.filter((book: GoogleBook) => bookHasRequiredFields(book));
  return filteredBooks
}

function formatGoogleBooks(filteredBooks: GoogleBook[]): Book[] {
  const formattedBooks: Book[] = filteredBooks.map((book: GoogleBook) => ({
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors[0],
    published: book.volumeInfo.publishedDate,
    genres: book.volumeInfo.categories,
    description:book.volumeInfo.description,
    image: book.volumeInfo.imageLinks.thumbnail,
    id: book.id,
  })); 
  return formattedBooks
}