import React from 'react'
import { useParams } from 'react-router-dom'
import ShowPost from './show-post'
import { SinglePost } from '../../store/postReducer'

interface SHOW_SINGLE_POST_PROPS {
    posts: SinglePost[],
    currentUserId: string
}
const ShowSinglePost: React.FC<SHOW_SINGLE_POST_PROPS> = ({ posts, currentUserId }) => {
    let { postId } = useParams<{ postId: string }>()
    let selectedPost = posts.find((sig, index) => sig._id == postId)
    return (
        <div>
            <ShowPost post={selectedPost!} currentUserId={currentUserId} />
        </div>
    )
}

export default ShowSinglePost
