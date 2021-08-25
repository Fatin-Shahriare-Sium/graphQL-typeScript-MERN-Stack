import React, { useState } from 'react'
import likefill from '../../assets/like-fill.svg'
import dislikefill from '../../assets/dislike-fill.svg'
import commentType from '../../assets/comment-type.svg'
import more from '../../assets/more.svg'
import book from '../../assets/book.svg'
import deletex from '../../assets/delete.svg'
import addFriend from '../../assets/add-user.svg'
import { Link } from 'react-router-dom'
import moment from 'moment'
import UseHandleNotification from '../hooks/useHandleNotification'

interface SINGLE_NOTIFICATION {
    id: string,
    notifier: {
        _id: string,
        name: string,
        profilePic: string
    },
    notificationText: string,
    seen: boolean,
    type: string//Like/Dislike,Comment,
    createdAt: string,
    where: {
        path: string,
        link: string
    }
}

interface SINGLE_NOTIFICATION_PROPS {
    notification: SINGLE_NOTIFICATION,
    userId: string
}

const SingleNotification: React.FC<SINGLE_NOTIFICATION_PROPS> = ({ notification, userId }) => {
    let { handleClickNotofication, deleteNotification } = UseHandleNotification()
    let [optionx, setOptionx] = useState<boolean>(false)

    let toggleOptionPalet = () => {
        return setOptionx(pre => !pre)
    }
    function renderTypeImage(type: string) {
        if (type == 'Like') {
            return likefill
        } else if (type == 'Dislike') {
            return dislikefill
        } else if (type == 'Comment') {
            return commentType
        } else if (type == 'Request') {
            return addFriend
        }
    }
    return (

        <div className="notification-wrapper">
            <Link to={`/${notification.where.path}/${notification.where.link}`}>
                <div onClick={notification.seen ? () => { } : () => handleClickNotofication(notification.id, userId)} className='single-notification'>
                    <div className="notifier-user">
                        <img className='notifier-user__img' src={notification.notifier.profilePic} alt="" />
                        <div className='notify-type-img' >
                            <img style={{ width: '17px' }} src={renderTypeImage(notification.type)} alt="" />
                        </div>
                    </div>
                    <div className={notification.seen ? 'notification-details notification-seen' : 'notification-details'}>
                        <p style={{ fontWeight: 700 }}>{notification.notifier.name}</p>
                        <p style={{ wordBreak: 'break-all', fontSize: '.9rem' }}>{notification.notificationText}</p>
                        <p style={{ fontSize: '.7rem' }}>{moment(notification.createdAt).fromNow()}</p>
                    </div>
                </div>
            </Link>
            <div className='notification-settings'>
                <img onClick={toggleOptionPalet} style={{ width: '23px' }} src={more} alt="" />
                {optionx && <div className='notification-settings__elements'>
                    <div onClick={() => handleClickNotofication(notification.id, userId)}>
                        <img style={{ width: '17px' }} src={book} alt="" />
                        {notification.seen ? <p>Mark as unread</p> : <p>Mark as read</p>}
                    </div>
                    <div onClick={() => deleteNotification(notification.id, userId)}>
                        <img style={{ width: '17px' }} src={deletex} alt="" />
                        <p>Remove this</p>
                    </div>
                </div>}
            </div>
        </div>

    )
}

export default SingleNotification;
