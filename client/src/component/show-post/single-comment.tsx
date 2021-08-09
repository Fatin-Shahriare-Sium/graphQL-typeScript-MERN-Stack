import moment from 'moment';
import React, { useEffect, useState } from 'react'
import like from '../../assets/like.svg'
import likeFill from '../../assets/like-fill.svg'
import dislike from '../../assets/dislike.svg'
import dislikeFill from '../../assets/dislike-fill.svg'
import more from '../../assets/more.svg'
import useLDC from '../hooks/useLDC';
import { sign } from 'crypto';


interface SingleCommentStructure {
    _id: string,
    user: {
        _id: string,
        name: string,
        profilePic: string
    },
    commentText: string,
    likes: string[],
    dislikes: string[],
    reply: SingleCommentStructure[],
    createdAt: string

}

interface SingleCommentProps {
    comment: SingleCommentStructure,
    needToUpdateLike: (userId: string, commentId: string) => any,
    needToUpdateDislike: (userId: string, commentId: string) => any,

}

const SingleComment: React.FC<SingleCommentProps> = ({ comment, needToUpdateDislike, needToUpdateLike }) => {
    let { handleCommentLike, handleCommentDislike } = useLDC()
    let [userId, setUserId] = useState<string>('')
    function HANDLE_COMMENT_LIKE() {
        needToUpdateLike(userId, comment._id)
        handleCommentLike(comment._id)
    }

    function HANDLE_COMMENT_DISLIKE() {
        needToUpdateDislike(userId, comment._id)
        handleCommentDislike(comment._id)

    }

    useEffect(() => {
        let jsonUserx: any = localStorage.getItem("__userx")
        let userx = JSON.parse(jsonUserx)
        setUserId(userx.id)
    }, [])
    return (
        <div className='single-comment'>
            <div className='single-comment__userImg'>
                <img style={{ width: "43px", clipPath: 'circle()' }} src={comment.user.profilePic} alt="" />
            </div>
            <div className='single-comment___main'>
                <p style={{ fontSize: '.7rem', fontWeight: 500 }}>{comment.user.name} . {moment(comment.createdAt).fromNow()}</p>
                <p style={{ fontSize: '.9rem' }}>{comment.commentText}</p>
                <div className='single-comment-socialBox'>
                    <img onClick={() => HANDLE_COMMENT_LIKE()} src={comment.likes.includes(userId) ? likeFill : like} alt="" />
                    <img onClick={() => HANDLE_COMMENT_DISLIKE()} src={comment.dislikes.includes(userId) ? dislikeFill : dislike} alt="" />
                    <p style={{ fontSize: '.8rem', fontWeight: 500, cursor: "pointer" }}>Reply</p>
                </div>
                <div className='more-icon'>
                    <img src={more} alt="" />
                </div>
            </div>
        </div>
    )
}

export default SingleComment;
