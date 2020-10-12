import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { Book } from '../types/Book'
import { FetchResult, useMutation } from '@apollo/client'
import './BookCard.css'
import { ADD_BOOK_DATA, ADD_BOOK_VARS, ADD_BOOK } from '../queries/ADD_BOOK'

interface IProps {
    book: Book
}

export const BookCard = ({book}: IProps) => {
    const [addBookToDatabase, { error, loading, data }] = useMutation<ADD_BOOK_DATA, ADD_BOOK_VARS>(ADD_BOOK)
    return(
        <Card className="book-container">
            <Image src={book.image} className="book-image"/>
            <Card.Content className="book-content">
                <Card.Header>{book.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>Pubslihed: {book.published}</span>
                </Card.Meta>
                <Card.Content extra>
                        {`Written by ${book.author}`}
                </Card.Content>
            </Card.Content>
            <Button onClick={e => {
                addBookToDatabase({
                    variables: {
                        title: book.title,
                        author: book.author,
                        published: book.published,
                        genres: book.genres,
                        description: book.description,
                        image: book.image,
                        googleBookId: book.id
                }})
            }}>+</Button>
        </Card>
    )
}