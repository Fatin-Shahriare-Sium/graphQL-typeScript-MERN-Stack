import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { FETCH_POST, useData } from '../../store';
import { POST_ACTION_TYPE } from '../../store/postReducer';

let CREATE_POST_DATA = gql`


mutation createPost($text:String!,$imgs:[SingleImg],$userId:String!){
 createPost(text:$text,imgs:$imgs,userId:$userId){
    _id,
          text,
          likes,
         dislikes,
         bookmarked,
         comments{
             user
             commentText
         }
         user{
             _id,
             name,
             profilePic
         }
         imgs{
             id,
             src
         }
         createdAt,
         updatedAt
  
 }
}

`
let DELETE_SINGLE_POST = gql`
mutation deleteSinglePost($postId:String!,$userId:String!){
    deleteSinglePost(postId:$postId,userId:$userId){
        text
        color
    }
}

`
interface imgsData {
    id: string,
    src: string
}

const UseHandlePost = () => {

    let { auth, posts, dispatch } = useData()

    let [createPost] = useMutation(CREATE_POST_DATA)
    let [deletePost] = useMutation(DELETE_SINGLE_POST)
    let [error, setError] = useState<{ msg: string, color: string, ableToCreate: boolean }>()

    let handleCreatePost = async (text: string, imgs: imgsData[]) => {

        let textArray = text.split('')
        console.log(textArray.length);
        if (textArray.length >= 500) {
            return setError({
                msg: "Can't write more than 500 words",
                color: 'danger',
                ableToCreate: false
            })
        }

        let responses = await createPost({
            variables: { userId: auth!.user.id, text, imgs }, refetchQueries: [{
                query: FETCH_POST,
                variables: { skip: 0 }
            }]
        })

        //data.createPost


        if (responses) {
            setError({
                msg: 'Successfully,created a post',
                color: "success",
                ableToCreate: true
            })
        }

        dispatch!({ type: POST_ACTION_TYPE.UPDATE_ALLPOST, payload: [responses.data.createPost, ...posts] })


    }

    let handleDeletePost = async (postId: string, userId: string) => {



        let responses = await deletePost({ variables: { postId, userId } })



        console.log(responses);

    }


    return {
        handleCreatePost,
        handleDeletePost,
        error
    }
}

export default UseHandlePost;
