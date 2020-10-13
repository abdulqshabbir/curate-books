import React, { useState } from 'react'
import { Notification } from '../types/Notification'
import './ToastNotification.css'

interface IProps {
    notification: Notification,
    position: string,
    color: string
}

type  TSetNotification  = React.Dispatch<React.SetStateAction<Notification | null>>

export const ToastNotification = (
    {
        notification: not, 
        position,
        color = 'skyblue'
    }: IProps) => {

    const [notification, setNotification] = useState<Notification | null>(not)

    const closeNotification = (setNotification: TSetNotification) =>  {
        setNotification(null)
    }
    if (notification === null) {
        return null
    }
    return (
        <div className={`notification-container ${position}`} >
            <div className={`notification toast ${position }`} style={{backgroundColor: color }} >
                <button onClick={() =>  closeNotification(setNotification)}>x</button>
                <div>
                    <p className="notification-title">{notification.title}</p>
                    <p className="notification-message">{notification.description}</p>
                </div>
            </div>
        </div>
    )
}
