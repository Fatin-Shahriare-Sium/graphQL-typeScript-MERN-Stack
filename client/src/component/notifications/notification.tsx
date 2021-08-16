import { gql, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useData } from '../../store'
import './notification.scss'
import SingleNotification from './single-notification'

export let USER_NOTIFICATIONS = gql`

query($userId:String!){
    fetchUserNotifications(userId:$userId){
        id,
        notifier{
            _id,
            name,
            profilePic
        }
    notificationText,
    seen,
    type,
    where{
        path
        link
    }
    }
}

`
const Notifications = () => {
    // let 
    let { auth } = useData()
    let { data } = useQuery(USER_NOTIFICATIONS, { variables: { userId: auth!.user.id } })
    console.log('notificatin sbfbwhfe');
    useEffect(() => {
        console.log(data);

    }, [data])
    return (
        <div>
            {/* <SingleNotification />
            <SingleNotification />
            <SingleNotification /> */}
            {data && data.fetchUserNotifications.map((sig: any, index: any) => <SingleNotification key={index} userId={auth!.user.id} notification={sig} />)}
        </div>
    )
}

export default Notifications;
