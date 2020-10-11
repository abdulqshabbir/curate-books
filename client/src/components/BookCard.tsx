import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Book } from '../types/Book'
import './BookCard.css'

interface IProps {
    book: Book
}

export const BookCard = ({book}: IProps) => {
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
        </Card>
    )
}