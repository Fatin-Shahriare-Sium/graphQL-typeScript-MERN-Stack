import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useData } from '../../store'
import { POST_ACTION_TYPE } from '../../store/postReducer'
import { FETCH_USER_BOOKMARK } from '../bookmark/bookmark'


let LIKE_HANDLER = gql`
         
mutation ($userObj:UserObj,$postId:String){
    handleLike(userObj:$userObj,postId:$postId){
        msg
    }
}

`
let DISLIKE_HANDLER = gql`
     
  mutation ($userObj:UserObj,$postId:String){
      handleDislike(userObj:$userObj,postId:$postId){
          msg
      }
  }
`

let CREATE_COMMENT = gql`

mutation ($userObj:UserObj,$text:String,$postId:String){
    createComment(userObj:$userObj,text:$text,postId:$postId){
        _id
    user{
        _id
        name
        profilePic
    }
    commentText
    createdAt
    likes
    dislikes
    parentCommentId
    reply{
        _id
    }
   
}
}
`

let HANDLE_COMMENT_LIKE = gql`
    mutation ($userObj:UserObj,$commentId:String){
        handleCommentLike(userObj:$userObj,commentId:$commentId){
            msg
        }
    }
`


let HANDLE_COMMENT_DISLIKE = gql`
mutation ($userObj:UserObj,$commentId:String){
handleCommentDislike(userObj:$userObj,commentId:$commentId){
    msg
}
}

`
let CREATE_COMMENT_REPLY = gql`

 mutation ($userObj:UserObj,$text:String,$commentId:String){
     createCommentReply(userObj:$userObj,text:$text,commentId:$commentId){
        _id
    user{
        _id
        name
        profilePic
    }
    commentText
    createdAt
    likes
    dislikes
    parentCommentId
    reply{
        _id
    }
     }
 }
 `

let ADD_BOOKMARK = gql`
 
 mutation($userId:String!,$postId:String!){
    createBookmark(userId:$userId,postId:$postId){
        msg
    }
 }
 
 `

const useLDC = () => {

    let { dispatch, auth } = useData()
    let location = useLocation()
    let userId = auth!.user.id
    let userObj = {
        id: auth!.user.id,
        name: auth!.user.name,
        profilePic: auth!.user.profilePic
    }



    let [likeHandler] = useMutation(LIKE_HANDLER)
    let [dislikeHandler] = useMutation(DISLIKE_HANDLER)
    let [createComment] = useMutation(CREATE_COMMENT)
    let [commentLikeHandler] = useMutation(HANDLE_COMMENT_LIKE)
    let [commentDislikeHandler] = useMutation(HANDLE_COMMENT_DISLIKE)
    let [createCommentReply] = useMutation(CREATE_COMMENT_REPLY)
    let [addToBookmark] = useMutation(ADD_BOOKMARK)


    async function handleLike(postId: string) {


        dispatch!({ type: POST_ACTION_TYPE.HANDLE_LIKE, payload: { postId, userId } })

        let respones = await likeHandler({ variables: { userObj, postId } })

        console.log('respones back in LDC -when like', respones);


    }

    async function handleDislike(postId: string) {


        dispatch!({ type: POST_ACTION_TYPE.HANDLE_DISLIKE, payload: { userId, postId } })

        let respones = await dislikeHandler({ variables: { userObj, postId } })

        console.log('respones back IN LDC -when dislike', respones);

    }

    async function handleCreateComment(postId: string, text: string) {

        console.log(text.length);

        let responesx = await createComment({ variables: { userObj, postId, text } })


        return {
            newComment: responesx.data.createComment
        }


    }

    async function handleCommentLike(commentId: string) {

        let respones = await commentLikeHandler({ variables: { userObj, commentId } })

        console.log(respones);

    }

    async function handleCommentDislike(commentId: string) {

        let respones = await commentDislikeHandler({ variables: { userObj, commentId } })

        console.log(respones);

    }

    async function handleCreateCommentReply(commentId: string, text: string) {

        let responesx = await createCommentReply({ variables: { userId, commentId, text } })

        return {
            newReply: responesx.data.createCommentReply
        }

    }
    async function handleBookmark(postId: string) {
        dispatch!({ type: POST_ACTION_TYPE.HANDLE_BOOKMARK, payload: { userId, postId } })
        console.log(location);
        if (location.pathname == '/bookmarks') {

            let responsex = await addToBookmark({
                variables: { userId, postId },
                refetchQueries: [{
                    query: FETCH_USER_BOOKMARK,
                    variables: { userId }
                }]
            })
            console.log('responses', responsex);
        } else {
            let responsex = await addToBookmark({
                variables: { userId, postId }
            })
            console.log('responses', responsex);
        }



    }
    return { handleLike, handleDislike, handleCreateComment, handleCommentLike, handleCommentDislike, handleCreateCommentReply, handleBookmark }
}

export default useLDC;
