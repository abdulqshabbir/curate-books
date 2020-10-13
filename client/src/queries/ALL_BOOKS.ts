import { Book } from '../types/Book';
import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      id
      published
      genres
      description
      image
    }
  }
`;

export interface ALL_BOOKS_DATA {
  allBooks: [Book]
}