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
      }
      ... on CreateBookFailed {
        message
        field
      }
    }
  }
`;