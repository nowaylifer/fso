import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      bookCount
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author
      published
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($book: BookDraft!) {
    addBook(book: $book) {
      id
      title
      author
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
    }
  }
`;
