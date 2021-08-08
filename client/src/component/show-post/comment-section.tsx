import React, { useEffect, useState } from 'react'
import CommentInput from './comment-input'
import SingleComment from './single-comment'
import { useInView } from 'react-intersection-observer';
import { gql, useLazyQuery } from '@apollo/client';
import useLDC from '../hooks/useLDC';
interface Comment_Section {
    postId: string
}

let FETCH_SOME_COMMENTS = gql`

query($postId:String!){
    someComment(postId:$postId){
        user{
            _id
            name
            profilePic
        }
        commentText
        createdAt
        likes
        dislikes
        
    }
}


`

const CommentSection: React.FC<Comment_Section> = ({ postId }) => {
    const { ref, inView, entry } = useInView();
    let [fetchSomeCommentsx, { data }] = useLazyQuery(FETCH_SOME_COMMENTS)
    let [newComment, setNewComment] = useState<any>(localStorage.getItem('newComment'))
    let [comments, setComments] = useState<any>([])
    async function fetchSomeComments() {
        await fetchSomeCommentsx({ variables: { postId } })
    }
    useEffect(() => {


        if (!data && inView) {
            fetchSomeComments()


        }
    }, [inView])

    useEffect(() => {

        if (data) {
            setComments(data.someComment)
        }

    }, [data])
    window.addEventListener('storage', () => {
        console.log('    window.addEventListener');

    })
    useEffect(() => {
        console.log('newCommentObj', newComment);
        let newCommentJSON = localStorage.getItem('newComment')
        let newCommentObj = JSON.parse(newCommentJSON!)

        // if (postId == newCommentObj.postId) {
        //     setComments([newCommentObj, ...comments])
        // }

    }, [JSON.stringify(newComment)])

    window.addEventListener('storage', () => {
        // When local storage changes, dump the list to
        // the console.
        console.log('changed in locale storage');

    });

    return (
        <div id={`comment-section-${postId}`} ref={ref}>
            <CommentInput postId={postId} />
            <hr />
            {comments && comments.map((sig: any, index: any) =>
                <SingleComment key={index} comment={sig} />
            )}
        </div>
    )
}

export default CommentSection;
