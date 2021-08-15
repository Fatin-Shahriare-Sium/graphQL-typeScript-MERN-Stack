import React from 'react'
import './notification.scss'
import SingleNotification from './single-notification'
const Notifications = () => {
    return (
        <div>
            <SingleNotification />
            <SingleNotification />
            <SingleNotification />
        </div>
    )
}

export default Notifications;
