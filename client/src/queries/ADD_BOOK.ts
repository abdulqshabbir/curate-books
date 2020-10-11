import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String
    $author: String
    $published: Int
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      __typename
      ... on Book {
        title
        author
        published
        genres
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
  published: number,
  genres: [string],
  id: string,
}

export type ADD_BOOK_DATA = ADD_BOOK_SUCCESS | ADD_BOOK_FAILURE

export interface ADD_BOOK_VARS {
  title: string,
  author: string,
  published: number,
  genres: string[]
}