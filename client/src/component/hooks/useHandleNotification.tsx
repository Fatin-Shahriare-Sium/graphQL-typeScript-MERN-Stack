import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { USER_NOTIFICATIONS } from '../notifications/notification'

let HANDLE_CLICK_NOTIFICATION = gql`
mutation ($notificationId:String!){
 
    notificationWatch(notificationId:$notificationId){
        msg
    }

}

`

let REMOVE_NOTIFICATION = gql`

mutation($notificationId:String!,$userId:String!){
    removeNotification(notificationId:$notificationId,userId:$userId){
        msg
    }
}

`

const UseHandleNotification = () => {
    let [whenClick] = useMutation(HANDLE_CLICK_NOTIFICATION)
    let [removeNotification] = useMutation(REMOVE_NOTIFICATION)
    async function deleteNotification(notificationId: string, userId: string) {
        let responses = await removeNotification({
            variables: { notificationId, userId },
            refetchQueries: [{
                query: USER_NOTIFICATIONS,
                variables: {
                    userId
                }
            }]

        })

        console.log(responses);

    }

    async function handleClickNotofication(notificationId: string, userId: string) {
        console.log('handleClickNotofication', notificationId);

        let responses = await whenClick({
            variables: { notificationId },
            refetchQueries: [{
                query: USER_NOTIFICATIONS,
                variables: {
                    userId
                }
            }]


        })

        console.log(responses);

    }

    return { handleClickNotofication, deleteNotification }
}

export default UseHandleNotification;
