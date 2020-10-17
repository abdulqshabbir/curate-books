import React, { useEffect, useState } from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import { Book } from '../types/Book'
import { useMutation } from '@apollo/client'
import { ADD_BOOK_DATA, ADD_BOOK_VARS, ADD_BOOK } from '../queries/ADD_BOOK'
import { PageRoute } from '../types/PageRoute'
import { Notification } from '../types/Notification'
import { ToastNotification } from './ToastNotification'
import './BookCard.css'
import { ALL_BOOKS } from '../queries'
import { DELETE_BOOK, DELETE_BOOK_DATA, DELETE_BOOK_VARS } from '../queries/DELETE_BOOK'

interface IProps {
    book: Book,
    setPage: React.Dispatch<React.SetStateAction<PageRoute>>,
    setShowBook: React.Dispatch<React.SetStateAction<Book | null>>,
    page: PageRoute
}

export const BookCard = ({ 
    book, 
    setPage, 
    setShowBook, 
    page
}: IProps

) => {
    const [ notification, setNotification] = useState<Notification | null>(null)

    const [addBookToDatabase, { data }] = 
        useMutation
            <ADD_BOOK_DATA, ADD_BOOK_VARS>
            (ADD_BOOK, {refetchQueries: [{query: ALL_BOOKS}]})

    const [deleteBookFromDatabase] = 
        useMutation
            <DELETE_BOOK_DATA, DELETE_BOOK_VARS>
            (DELETE_BOOK, {refetchQueries: [{query: ALL_BOOKS}]})

    useEffect(() => {
        displayToastNofification(data, book, setNotification)
    }, [data, book])

    async function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, book: Book){
        e.stopPropagation()
        await addBookToDatabase({
            variables: {
                title: book.title,
                author: book.author,
                published: book.published,
                genres: book.genres,
                description: book.description,
                image: book.image,
                googleBookId: book.googleBookId
            }
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
                {
                    page === 'books' ? 
                        null : 
                        <Button onClick={(e) => handleClick(e, book)}>+</Button>
                }
                {
                    page === 'books' ? 
                        <Button onClick={async e =>  {
                            e.stopPropagation()
                            console.log('book', book)
                            try {
                                await deleteBookFromDatabase({variables: {googleBookId: book.googleBookId}})
                            } catch(e) {
                                console.log(e)
                            }
                        }}>
                            <Icon name="trash">
                            </Icon>
                        </Button> 
                        : null
                }
            </Card>
            {
                notification
                && 
                <ToastNotification
                    notification={notification}
                    position='top-right'
                    color="#686d76"
                />
            }
        </div>
    )
}

function displayToastNofification(
    data: ADD_BOOK_DATA | null | undefined, 
    book: Book,
    setNotification: React.Dispatch<React.SetStateAction<Notification | null>>
) {
    if (!data) return
    if (data.addBook.__typename === 'Book') {
        setNotification({
            title: 'Yaay!!',
            description: `"${book.title}" was successfully added to database.`,
            color: 'skyblue'
        })
    } else if (data.addBook.__typename === 'BookAlreadyExists') {
        setNotification({
            title: 'Sorry...',
            description: data.addBook.message,
            color: '#ff4b5c'
        }) 
    } else {
        setNotification({
            title: 'Sorry...',
            description: 'Something went wrong',
            color: '#ff4b5c'
        })  
    } 
}