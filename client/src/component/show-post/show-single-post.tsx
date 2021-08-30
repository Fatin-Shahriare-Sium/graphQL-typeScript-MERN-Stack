import React from 'react'
import { useParams } from 'react-router-dom'
import ShowPost from './show-post'
import { gql, useQuery } from '@apollo/client'

interface SHOW_SINGLE_POST_PROPS {
    currentUserId: string
}

let FETCH_SINGLE_POST = gql`

query fetchSinglePost($postId:String!){
    fetchSinglePost(postId:$postId){
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
         updatedAt,
    }
}

`
const ShowSinglePost: React.FC<SHOW_SINGLE_POST_PROPS> = ({ currentUserId }) => {
    let { postId } = useParams<{ postId: string }>()
    let { data } = useQuery(FETCH_SINGLE_POST, { variables: { postId } })

    function renderSinglePost() {
        if (data.fetchSinglePost) {
            return <ShowPost post={data.fetchSinglePost} currentUserId={currentUserId} />
        } else {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "93vh" }}>
                    <p style={{ fontSize: 'clamp(33px,1vw,300px)', fontWeight: 700 }}>This post has been deleted</p>
                </div>
            )
        }
    }
    return (
        <div>

            {data && renderSinglePost()}
        </div>
    )
}

export default ShowSinglePost
