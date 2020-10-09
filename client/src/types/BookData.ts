export interface Book {
    title: string,
    author: string,
    published: string
}

export interface BooksData {
    allBooks: [Book]
}