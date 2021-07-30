import React from 'react'

const UseCreatePost = () => {
    interface imgsData {
        id: string,
        src: string
    }

    let handleCreatePost = (text: string, imgs: imgsData[]) => {
        console.log(text);
        console.log(imgs);

    }

    return {
        handleCreatePost
    }
}

export default UseCreatePost;
