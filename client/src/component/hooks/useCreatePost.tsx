import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { useData } from '../../store';

const UseCreatePost = () => {

    let CREATE_POST_DATA = gql`


   mutation createPost($text:String!,$imgs:[SingleImg],$userId:String!){
    createPost(text:$text,imgs:$imgs,userId:$userId){
        text
     
    }
   }
   
   `
    let { auth } = useData()

    let [createPost] = useMutation(CREATE_POST_DATA)

    let [error, setError] = useState<{ msg: string, color: string }>()



    interface imgsData {
        id: string,
        src: string
    }

    let handleCreatePost = async (text: string, imgs: imgsData[]) => {

        let textArray = text.split('')
        console.log(textArray.length);
        if (textArray.length >= 500) {
            return setError({
                msg: "Can't write more than 500 words",
                color: 'danger'
            })
        }

        let data = await createPost({ variables: { userId: auth?.user.id, text, imgs } })


        console.log(data);



    }

    return {
        handleCreatePost,
        error
    }
}

export default UseCreatePost;
