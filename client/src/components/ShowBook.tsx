import React from 'react'
import { Book } from '../types/Book'
import { Container, Divider, Header, Image, Segment } from 'semantic-ui-react'
import './ShowBook.css'

interface IProps {
    book: Book | null,
}

export const ShowBook = ({ book }: IProps) => {
    if (book === null) return null
    return (
        <Container className="show-book-container" key={book.id}>
            <Segment>
                <Header className="show-book-title">
                    {book.title}
                </Header>
                <Divider horizontal></Divider>
                <p className="show-book-text">
                    Author: {book.author}
                </p>
                <Divider horizontal></Divider>
                <p className="show-book-text">
                    Published on: {book.published}
                </p>
                <Divider horizontal></Divider>
                <p className="show-book-text">
                    Description: {book.description}
                </p>
                <Divider horizontal></Divider>
                <Image 
                    src={book.image}
                    size='small'
                    centered>
                </Image>
            </Segment>
        </Container>
    )
}