import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { FETCH_USER_PROFILE_DETAILS } from '../../store'

let SEND_FREIND_REQUEST = gql`

mutation($userId:String!,$peopleId:String!){
    sendFriendRequest(userId:$userId,peopleId:$peopleId){
        msg
    }
}



`

let SAVE_FRIEND_REQUEST = gql`

mutation($userId:String!,$requestedUserId:String!){
    saveFriend(userId:$userId,requestedUserId:$requestedUserId){
        msg
    }
}

`

let CANCEL_OWN_REQUEST = gql`

mutation($userId:String!,$requestedUserId:String!){
    cancelOwnRequest(userId:$userId,requestedUserId:$requestedUserId){
        msg
    }
}

`

let DELETE_FRIEND_REQUEST = gql`

mutation($userId:String!,$requestedUserId:String!){
    deleteFriendRequest(userId:$userId,requestedUserId:$requestedUserId){
        msg
    }
}

`

let UNFRIEND_THE_FRIEND = gql`

mutation($userId:String!,$friendId:String!){
    unfriend(userId:$userId,friendId:$friendId){
        msg
    }
}

`


const UseHandleFriend = () => {

    let [sendRequest] = useMutation(SEND_FREIND_REQUEST)

    let [saveFriend] = useMutation(SAVE_FRIEND_REQUEST)

    let [cancleOwnRequest] = useMutation(CANCEL_OWN_REQUEST)

    let [deleteFriendRequest] = useMutation(DELETE_FRIEND_REQUEST)

    let [unfriend] = useMutation(UNFRIEND_THE_FRIEND)

    let sendFriendRequest = async (userId: string, peopleId: string) => {
        let responses = await sendRequest({
            variables: { userId, peopleId }, refetchQueries: [{
                query: FETCH_USER_PROFILE_DETAILS,
                variables: { userId }
            }]
        })

        console.log(responses);

    }

    let acceptFriendRequest = async (userId: string, requestedUserId: string) => {

        let responses = await saveFriend({
            variables: { userId, requestedUserId }, refetchQueries: [{
                query: FETCH_USER_PROFILE_DETAILS,
                variables: { userId }
            }]
        })

        console.log(responses);
    }

    async function cancelRequest(userId: string, requestedUserId: string) {

        let responses = await cancleOwnRequest({
            variables: { userId, requestedUserId }, refetchQueries: [{
                query: FETCH_USER_PROFILE_DETAILS,
                variables: { userId }
            }]
        })

        console.log(responses);

    }

    async function removeFriendRequest(userId: string, requestedUserId: string) {

        let responses = await deleteFriendRequest({
            variables: { userId, requestedUserId }, refetchQueries: [{
                query: FETCH_USER_PROFILE_DETAILS,
                variables: { userId }
            }]
        })

        console.log(responses);

    }

    async function handleUnfriend(userId: string, friendId: string) {

        let responses = await unfriend({
            variables: { userId, friendId }, refetchQueries: [{
                query: FETCH_USER_PROFILE_DETAILS,
                variables: { userId }
            }]
        })

        console.log(responses);
    }

    return { sendFriendRequest, acceptFriendRequest, cancelRequest, removeFriendRequest, handleUnfriend }
}

export default UseHandleFriend;
