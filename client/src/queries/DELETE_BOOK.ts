import { gql } from '@apollo/client'

export const DELETE_BOOK = gql`
  mutation deleteBook($googleBookId: String!) {
    deleteBook(googleBookId: $googleBookId) {
      __typename
      ... on Book {
          googleBookId
          title
      }
      ... on BookDoesNotExist {
        message
      }
    }
  }
`;

interface DELETE_BOOK_SUCCESS {
  __typename: 'Book',
  googleBookId: string,
  title: string
}

interface BOOK_DOES_NOT_EXIST {
  __typename: 'BookDoesNotExist',
  message: string
}
export interface DELETE_BOOK_DATA {
  deleteBook:
  DELETE_BOOK_SUCCESS |
  BOOK_DOES_NOT_EXIST
}

export interface DELETE_BOOK_VARS {
  googleBookId: string
}