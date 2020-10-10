import { gql } from '@apollo/client'
import { Author } from '../types/Author';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export interface ALL_AUTHORS_DATA {
  allAuthors: [Author]
}
