import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useData } from '../../store'
import { POST_ACTION_TYPE } from '../../store/postReducer'

const useLDC = () => {
    let [error, setError] = useState()
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
            msg
        }
    }
    
    `

    let [likeHandler] = useMutation(LIKE_HANDLER)
    let [dislikeHandler] = useMutation(DISLIKE_HANDLER)
    let [createComment] = useMutation(CREATE_COMMENT)

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

        console.log(text);

        // dispatch!({ type: POST_ACTION_TYPE.HANDLE_DISLIKE, payload: { userId, postId } })

        let respones = await createComment({ variables: { userId, postId, text } })



        console.log('respones back IN LDC -when comment', respones);




    }

    return { handleLike, handleDislike, handleCreateComment }
}

export default useLDC;
