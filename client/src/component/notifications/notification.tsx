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
    createdAt
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

    useEffect(() => {

        let notiUi = document.getElementById('notifications') as HTMLDivElement


        if (data) {
            let unseenNotifications = data.fetchUserNotifications.filter((sig: any) => sig.seen == false)
            notiUi.setAttribute('data-length', unseenNotifications.length)
            console.log('need to noti reds', unseenNotifications.length);


        }
    }, [data])
    function renderNotifications() {
        if (data.fetchUserNotifications.length > 0) {
            return data.fetchUserNotifications.map((sig: any, index: any) => <SingleNotification key={index} userId={auth!.user.id} notification={sig} />)
        } else {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                    <p style={{ fontSize: '2rem', fontWeight: 700 }}>Empty</p>
                </div>
            )
        }
    }
    return (
        <div>
            {/* <SingleNotification />
            <SingleNotification />
            <SingleNotification /> */}
            {data && renderNotifications()}
        </div>
    )
}

export default Notifications;
