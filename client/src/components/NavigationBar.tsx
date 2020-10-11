import React from 'react'
import { PageRoute } from '../types/PageRoute'

interface IProps {
    setPage: React.Dispatch<React.SetStateAction<PageRoute>>
}

export const NavigationBar = ({setPage}: IProps) => {
   return (
       <div>
            <button onClick={() => setPage('books')}>Show Books</button>
            <button onClick={() => setPage("authors")}>Show Authors</button>
            <button onClick={() => setPage("create-book")}>Create Book</button>
            <button onClick={() => setPage("search-books")}>Search Books</button>
       </div>
   ) 
}