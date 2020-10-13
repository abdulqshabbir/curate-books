import React, { useState } from 'react'
import { PageRoute } from '../types/PageRoute'
import { Menu, Segment } from 'semantic-ui-react'

interface IProps {
    setPage: React.Dispatch<React.SetStateAction<PageRoute>>
}

export const NavigationBar = ({setPage}: IProps) => {
    const [activeMenuItem, setActiveMenuItem] = useState<PageRoute | null>(null)
    return (
       <Segment inverted style={{borderRadius: 0}}>
           <Menu inverted>
                <Menu.Item
                    name={'books'}
                    active={activeMenuItem === 'books'}
                    onClick={(e) => {
                        setPage('books')
                        setActiveMenuItem('books')
                    }}
                />

                <Menu.Item
                    name={'authors'}
                    active={activeMenuItem === 'authors'}
                    onClick={() => {
                        setPage('authors')
                        setActiveMenuItem('authors')
                    }}
                />
                <Menu.Item
                    name={'create-book'}
                    active={activeMenuItem === 'create-book'}
                    onClick={() => {
                        setPage('create-book')
                        setActiveMenuItem('create-book')
                    }}
                />
                <Menu.Item
                    name={'search-books'}
                    active={activeMenuItem === 'search-books'}
                    onClick={() => {
                        setPage('search-books')
                        setActiveMenuItem('search-books')
                    }}
                />
           </Menu>
       </Segment>
    ) 
}