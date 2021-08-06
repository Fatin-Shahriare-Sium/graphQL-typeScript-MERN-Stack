import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useData } from '../../store'
import { POST_ACTION_TYPE } from '../../store/postReducer'

const useLDC = () => {

    let { dispatch, auth } = useData()
    let userId = auth!.user.id
    console.log('userId', userId);

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
    let [likeHandler] = useMutation(LIKE_HANDLER)
    let [dislikeHandler] = useMutation(DISLIKE_HANDLER)

    async function handleLike(postId: string) {




        dispatch!({ type: POST_ACTION_TYPE.HANDLE_LIKE, payload: { postId, userId } })

        let respones = await likeHandler({ variables: { userId, postId } })



        console.log('respones back LDC', respones);


    }

    async function handleDislike(postId: string) {


        dispatch!({ type: POST_ACTION_TYPE.HANDLE_DISLIKE, payload: { userId, postId } })

        let respones = await dislikeHandler({ variables: { userId, postId } })



        console.log('respones back LDC', respones);


    }

    return { handleLike, handleDislike }
}

export default useLDC;
