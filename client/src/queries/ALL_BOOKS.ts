import { gql } from '@apollo/client'
import { Book } from '../types/Book';

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

export interface ALL_BOOKS_DATA {
  allBooks: [Book]
}