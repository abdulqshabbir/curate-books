import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String
    $author: String
    $published: String
    $genres: [String]
    $description: String,
    $image: String,
    $googleBookId: String,
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
      description: $description
      image: $image
      googleBookId: $googleBookId
    ) {
      __typename
      ... on Book {
        title
        author
        published
        genres
        description
        image
        googleBookId
        id
      }
      ... on CreateBookFailed {
        message
        field
      }
    }
  }
`;

interface ADD_BOOK_FAILURE {
  __typename: 'CreateBookFailed',
  message: string,
  field: string
}

interface ADD_BOOK_SUCCESS {
  __typename: 'Book',
  title: string,
  author: string,
  published: string,
  genres: [string],
  description: string,
  image: string,
  googleBookId: string,
  id: string,
}

export type ADD_BOOK_DATA = ADD_BOOK_SUCCESS | ADD_BOOK_FAILURE

export interface ADD_BOOK_VARS {
  title: string,
  author: string,
  published: string,
  genres: string[],
  description: string,
  image: string,
  googleBookId: string
}