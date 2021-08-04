import { gql, useMutation } from '@apollo/client'
import React from 'react'

const useLDC = () => {

    let LIKE_HANDLER = gql`
         
    mutation ($user:UserForHandleLike,$postId:string){
        handleLike(user:$user,postId:$postId){
            msg
        }
    }
   
   `
    let [likeHandler] = useMutation(LIKE_HANDLER)

    async function handleLike(userId: string, isLiked: boolean, postId: string) {



        let user = {
            userId,
            isLiked
        }



        let respones = await likeHandler({ variables: { user, postId } })

    }

    return { handleLike }
}

export default useLDC;
