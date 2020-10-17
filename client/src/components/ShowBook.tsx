import React from 'react'
import { Book } from '../types/Book'
import { Container, Divider, Header, Image, Segment } from 'semantic-ui-react'
import './ShowBook.css'
import { NavigationBar } from './NavigationBar'
import { PageRoute } from '../types/PageRoute'

interface IProps {
    book: Book | null,
    setPage: React.Dispatch<React.SetStateAction<PageRoute>>,
}

export const ShowBook = ({ book, setPage }: IProps) => {
    if (book === null) return null
    return (
        <div>
            <NavigationBar setPage={setPage} />
        <Container className="show-book-container" key={book.googleBookId}>
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

        </div>
    )
}