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
        _id
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
    let [newComment, setNewComment] = useState<any>(localStorage.getItem('_addCTO'))
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
        console.log(data);

        if (data) {
            setComments(data.someComment)
        }

    }, [data])

    function needToUpdateComment() {

        let newCommentJSON = localStorage.getItem('newComment')
        let newCommentObj = JSON.parse(newCommentJSON!)

        if (postId == newCommentObj.postId) {
            setComments([newCommentObj, ...comments])
        }
    }

    function needToUpdateLike(userId: string, commentId: string) {


        let allComments = comments.map((sig: any) => {
            return { ...sig }
        })
        let findedCommentIndex = allComments.findIndex((sig: any) => sig._id == commentId)
        console.log(findedCommentIndex);

        if (allComments[findedCommentIndex].likes.includes(userId)) {
            allComments[findedCommentIndex].likes = allComments[findedCommentIndex].likes.filter((sig: any) => sig !== userId)
        } else {
            allComments[findedCommentIndex].likes = [userId, ...allComments[findedCommentIndex].likes]
            allComments[findedCommentIndex].dislikes = allComments[findedCommentIndex].dislikes.filter((sig: any) => sig !== userId)
        }

        return setComments([...allComments])
    }

    function needToUpdateDislike(userId: string, commentId: string) {

        console.log('nneedToUpdateComment', commentId);

        let allComments = comments.map((sig: any) => {
            return { ...sig }
        })
        let findedCommentIndex = allComments.findIndex((sig: any) => sig._id == commentId)
        console.log(findedCommentIndex);

        if (allComments[findedCommentIndex].dislikes.includes(userId)) {
            allComments[findedCommentIndex].dislikes = allComments[findedCommentIndex].dislikes.filter((sig: any) => sig !== userId)
        } else {
            allComments[findedCommentIndex].dislikes = [userId, ...allComments[findedCommentIndex].dislikes]
            allComments[findedCommentIndex].likes = allComments[findedCommentIndex].likes.filter((sig: any) => sig !== userId)
        }

        return setComments([...allComments])
    }
    return (
        <div id={`comment-section-${postId}`} ref={ref}>
            <CommentInput autoRefresher={needToUpdateComment} postId={postId} />
            <hr />
            {comments && comments.map((sig: any, index: any) =>
                <SingleComment key={index} needToUpdateLike={needToUpdateLike} needToUpdateDislike={needToUpdateDislike} comment={sig} />
            )}
        </div>
    )
}

export default CommentSection;
