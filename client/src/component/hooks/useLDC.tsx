import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useData } from '../../store'
import { POST_ACTION_TYPE } from '../../store/postReducer'

const useLDC = () => {

    let { dispatch } = useData()
    let LIKE_HANDLER = gql`
         
    mutation ($user:UserForHandleLike,$postId:String){
        handleLike(user:$user,postId:$postId){
            msg
        }
    }
   
   `
    let DISLIKE_HANDLER = gql`
         
      mutation ($user:UserForHandleDislike,$postId:String){
          handleDislike(user:$user,postId:$postId){
              msg
          }
      }
   `
    let [likeHandler] = useMutation(LIKE_HANDLER)
    let [dislikeHandler] = useMutation(DISLIKE_HANDLER)

    async function handleLike(userId: string, isLiked: boolean, postId: string) {



        let user = {
            id: userId,
            isLiked
        }

        console.log('USER IN LDC', user);


        dispatch!({ type: POST_ACTION_TYPE.HANDLE_LIKE, payload: { postId, userId } })

        let respones = await likeHandler({ variables: { user, postId } })



        console.log('respones back LDC', respones);


    }

    async function handleDislike(userId: string, isLiked: boolean, postId: string) {



        let user = {
            id: userId,
            isLiked
        }

        console.log('USER IN LDC', user);



        let respones = await dislikeHandler({ variables: { user, postId } })



        console.log('respones back LDC', respones);


    }

    return { handleLike, handleDislike }
}

export default useLDC;
