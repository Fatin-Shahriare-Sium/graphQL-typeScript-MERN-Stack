import moment from 'moment';
import React from 'react'
import like from '../../assets/like.svg'
import likeFill from '../../assets/like-fill.svg'
import dislike from '../../assets/dislike.svg'
import dislikeFill from '../../assets/dislike-fill.svg'
import more from '../../assets/more.svg'


interface SingleCommentStructure {
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
    comment: SingleCommentStructure
}

const SingleComment: React.FC<SingleCommentProps> = ({ comment }) => {
    return (
        <div className='single-comment'>
            <div className='single-comment__userImg'>
                <img style={{ width: "43px", clipPath: 'circle()' }} src={comment.user.profilePic} alt="" />
            </div>
            <div className='single-comment___main'>
                <p style={{ fontSize: '.7rem', fontWeight: 500 }}>{comment.user.name} . {moment(comment.createdAt).fromNow()}</p>
                <p style={{ fontSize: '.9rem' }}>{comment.commentText}</p>
                <div className='single-comment-socialBox'>
                    <img src={like} alt="" />
                    <img src={dislike} alt="" />
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
