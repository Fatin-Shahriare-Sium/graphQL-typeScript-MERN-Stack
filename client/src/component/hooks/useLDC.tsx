import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useData } from '../../store'
import { POST_ACTION_TYPE } from '../../store/postReducer'
let queryCommentFields = `
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
}

`
const useLDC = () => {
    let [newComment, setNewComment] = useState<any>()
    let { dispatch, auth } = useData()
    let userId = auth!.user.id

    console.log(userId);

    let LIKE_HANDLER = gql`
         
    mutation ($userId:String,$postId:String){
        handleLike(userId:$userId,postId:$postId){
            msg
        }
    }
   
   `
    let DISLIKE_HANDLER = gql`
         
      mutation ($userId:String,$postId:String){
          handleDislike(userId:$userId,postId:$postId){
              msg
          }
      }
   `

    let CREATE_COMMENT = gql`
    
    mutation ($userId:String,$text:String,$postId:String){
        createComment(userId:$userId,text:$text,postId:$postId){
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
        mutation ($userId:String,$commentId:String){
            handleCommentLike(userId:$userId,commentId:$commentId){
                msg
            }
        }
    `


    let HANDLE_COMMENT_DISLIKE = gql`
    mutation ($userId:String,$commentId:String){
    handleCommentDislike(userId:$userId,commentId:$commentId){
        msg
    }
    }
    
    `
    let CREATE_COMMENT_REPLY = gql`
    
     mutation ($userId:String,$text:String,$commentId:String){
         createCommentReply(userId:$userId,text:$text,commentId:$commentId){
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

    let [likeHandler] = useMutation(LIKE_HANDLER)
    let [dislikeHandler] = useMutation(DISLIKE_HANDLER)
    let [createComment] = useMutation(CREATE_COMMENT)
    let [commentLikeHandler] = useMutation(HANDLE_COMMENT_LIKE)
    let [commentDislikeHandler] = useMutation(HANDLE_COMMENT_DISLIKE)
    let [createCommentReply] = useMutation(CREATE_COMMENT_REPLY)


    async function handleLike(postId: string) {


        dispatch!({ type: POST_ACTION_TYPE.HANDLE_LIKE, payload: { postId, userId } })

        let respones = await likeHandler({ variables: { userId, postId } })

        console.log('respones back in LDC -when like', respones);


    }

    async function handleDislike(postId: string) {


        dispatch!({ type: POST_ACTION_TYPE.HANDLE_DISLIKE, payload: { userId, postId } })

        let respones = await dislikeHandler({ variables: { userId, postId } })

        console.log('respones back IN LDC -when dislike', respones);

    }

    async function handleCreateComment(postId: string, text: string) {

        console.log(text.length);

        // dispatch!({ type: POST_ACTION_TYPE.HANDLE_DISLIKE, payload: { userId, postId } })
        // let newCommentx = {
        //     _id: `${postId}-${text.length} `,
        //     postId,
        //     user: {
        //         _id: userId,
        //         name: auth!.user.name,
        //         profilePic: auth!.user.profilePic,
        //     },
        //     commentText: text,
        //     likes: [],
        //     dislikes: [],
        //     reply: [],
        //     createdAt: ''

        // }

        // localStorage.setItem('newComment', JSON.stringify({ ...newCommentx }))

        let responesx = await createComment({ variables: { userId, postId, text } })


        return {
            newComment: responesx.data.createComment
        }


    }

    async function handleCommentLike(commentId: string) {

        let respones = await commentLikeHandler({ variables: { userId, commentId } })

        console.log(respones);

    }

    async function handleCommentDislike(commentId: string) {

        let respones = await commentDislikeHandler({ variables: { userId, commentId } })

        console.log(respones);

    }
    async function handleCreateCommentReply(commentId: string, text: string) {

        let responesx = await createCommentReply({ variables: { userId, commentId, text } })

        return {
            newReply: responesx.data.createCommentReply
        }

    }
    return { handleLike, handleDislike, handleCreateComment, handleCommentLike, handleCommentDislike, handleCreateCommentReply }
}

export default useLDC;
