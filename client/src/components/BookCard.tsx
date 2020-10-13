import React, { useState } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { Book } from '../types/Book'
import { useMutation } from '@apollo/client'
import { ADD_BOOK_DATA, ADD_BOOK_VARS, ADD_BOOK } from '../queries/ADD_BOOK'
import { PageRoute } from '../types/PageRoute'
import { Notification } from '../types/Notification'
import { ToastNotification } from './ToastNotification'
import './BookCard.css'
import { ALL_BOOKS } from '../queries'

interface IProps {
    book: Book,
    setPage: React.Dispatch<React.SetStateAction<PageRoute>>,
    setShowBook: React.Dispatch<React.SetStateAction<Book | null>>
}

export const BookCard = ({ book, setPage, setShowBook}: IProps) => {

    const [ notification, setNotification] = useState<Notification | null>(null)

    const [addBookToDatabase] = 
        useMutation<ADD_BOOK_DATA, ADD_BOOK_VARS>(ADD_BOOK, {
            refetchQueries: [{query: ALL_BOOKS}]
        })

    async function handleClick(
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            book: Book,
            setNotification:React.Dispatch<React.SetStateAction<Notification | null>>
        ) {
        e.stopPropagation()
        await addBookToDatabase({
            variables: {
                title: book.title,
                author: book.author,
                published: book.published,
                genres: book.genres,
                description: book.description,
                image: book.image,
                googleBookId: book.id
            }
        })
        setNotification({
            title: 'Success',
            description: `"${book.title}" was successfully added to database.`,
            color: 'skyblue'
        })
    }

    return(
        <div>
            <Card 
                className="book-container"
                onClick={() => {
                    setShowBook(book)
                    setPage('show-book')
                }}>
                <Image src={book.image} className="book-image"/>
                <Card.Content className="book-content">
                    <Card.Header>
                        {book.title}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            Pubslihed: {book.published}
                        </span>
                    </Card.Meta>
                    <Card.Content extra>
                        {`Written by ${book.author}`}
                    </Card.Content>
                </Card.Content>
                <Button onClick={(e) => handleClick(e, book, setNotification)}>+</Button>
            </Card>
            {notification && <ToastNotification notification={notification} position='top-right' color="#686d76"/>}
        </div>
    )
}