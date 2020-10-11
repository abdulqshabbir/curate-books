import React from 'react'
import './ToastNotification.css'

interface Notification {
    id: number,
    type: string,
    title: string,
    description: string
}

interface IProps {
    notification: Notification,
    position: string
}

export const ToastNotification = ({notification, position}: IProps) => {
    return <div className={`notification-container ${position}`}>
        <div className="notification toast">
            <button>x</button>
            <div className="notification-image"></div>
            <div>
                <p className="notification-title">title</p>
                <p className="notification-message">mesage</p>
            </div>
        </div>
    </div>
}
