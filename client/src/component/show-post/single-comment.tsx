import moment from 'moment';
import React, { useEffect, useState } from 'react'
import like from '../../assets/like.svg'
import likeFill from '../../assets/like-fill.svg'
import dislike from '../../assets/dislike.svg'
import dislikeFill from '../../assets/dislike-fill.svg'
import more from '../../assets/more.svg'
import useLDC from '../hooks/useLDC';
import CommentInput from './comment-input';
import { Link } from 'react-router-dom';


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
    createdAt: string,
    parentCommentId: string

}

interface SingleCommentProps {
    comment: SingleCommentStructure,
    needToUpdateLike: (userId: string, commentId: string) => any,
    needToUpdateDislike: (userId: string, commentId: string) => any,

}

const SingleComment: React.FC<SingleCommentProps> = ({ comment, needToUpdateDislike, needToUpdateLike }) => {
    let { handleCommentLike, handleCommentDislike } = useLDC()
    let [userId, setUserId] = useState<string>('')
    let [showBox, setShowBox] = useState(false)
    let [replies, setReplies] = useState<any>(comment.reply)

    function HANDLE_COMMENT_LIKE() {
        needToUpdateLike(userId, comment._id)
        handleCommentLike(comment._id)
    }

    function HANDLE_COMMENT_DISLIKE() {
        needToUpdateDislike(userId, comment._id)
        handleCommentDislike(comment._id)

    }

    function toggleReplyBox() {
        setShowBox(pre => !pre)
    }

    useEffect(() => {
        let jsonUserx: any = localStorage.getItem("__userx")
        let userx = JSON.parse(jsonUserx)
        setUserId(userx.id)
    }, [])



    function needToUpdateReply(newReplyObj: any) {

        console.log('newReplyObj', newReplyObj);


        if (replies) {
            setReplies([newReplyObj, ...replies])
        } else {
            setReplies([newReplyObj])
        }
        toggleReplyBox()
    }
    function needToUpdateLikeForReply(userId: string, commentId: string) {


        let allReplies = replies.map((sig: any) => {
            return { ...sig }
        })
        let findedCommentIndex = allReplies.findIndex((sig: any) => sig._id == commentId)
        console.log(findedCommentIndex);

        if (allReplies[findedCommentIndex].likes.includes(userId)) {
            allReplies[findedCommentIndex].likes = allReplies[findedCommentIndex].likes.filter((sig: any) => sig !== userId)
        } else {
            allReplies[findedCommentIndex].likes = [userId, ...allReplies[findedCommentIndex].likes]
            allReplies[findedCommentIndex].dislikes = allReplies[findedCommentIndex].dislikes.filter((sig: any) => sig !== userId)
        }

        return setReplies([...allReplies])
    }

    function needToUpdateDislikeForReply(userId: string, commentId: string) {



        let allReplies = replies.map((sig: any) => {
            return { ...sig }
        })
        let findedCommentIndex = allReplies.findIndex((sig: any) => sig._id == commentId)
        console.log(findedCommentIndex);

        if (allReplies[findedCommentIndex].dislikes.includes(userId)) {
            allReplies[findedCommentIndex].dislikes = allReplies[findedCommentIndex].dislikes.filter((sig: any) => sig !== userId)
        } else {
            allReplies[findedCommentIndex].dislikes = [userId, ...allReplies[findedCommentIndex].dislikes]
            allReplies[findedCommentIndex].likes = allReplies[findedCommentIndex].likes.filter((sig: any) => sig !== userId)
        }

        return setReplies([...allReplies])
    }
    return (
        <div className='single-comment'>
            <div className='single-comment__userImg'>
                <img className={comment.user.profilePic} style={{ width: "43px", clipPath: 'circle()' }} src={comment.user.profilePic} alt="" />
            </div>

            <div className='single-comment___main ms-1'>
                <Link to={`/profile/${comment.user._id}`} >
                    <p className='single-comment__username' style={{ fontSize: '.7rem', fontWeight: 500 }}>{comment.user.name} . {moment(comment.createdAt).fromNow()}</p>
                </Link>
                <p className='single-comment__text' style={{ fontSize: '.9rem' }}>{comment.commentText}</p>
                <div className='single-comment-socialBox'>
                    <div>
                        <img onClick={() => HANDLE_COMMENT_LIKE()} src={comment.likes.includes(userId) ? likeFill : like} alt="" />
                        <p >{comment.likes.length === 0 ? '' : comment.likes.length}</p>
                    </div>
                    <div>
                        <img onClick={() => HANDLE_COMMENT_DISLIKE()} src={comment.dislikes.includes(userId) ? dislikeFill : dislike} alt="" />
                        <p>{comment.dislikes.length === 0 ? '' : comment.dislikes.length}</p>
                    </div>
                    <p onClick={toggleReplyBox} style={{ fontSize: '.8rem', fontWeight: 500, cursor: "pointer" }}>Reply</p>

                </div>
                <div className='mt-3'>
                    {showBox && <CommentInput type='reply' metionedUser={`@${comment.user.name}-`} commentId={comment.parentCommentId ? comment.parentCommentId : comment._id} autoRefresher={needToUpdateReply} />}
                </div>
                <div className='show-reply'>
                    {replies && replies.map((sig: any) => <SingleComment comment={sig} needToUpdateLike={needToUpdateLikeForReply} needToUpdateDislike={needToUpdateDislikeForReply} />)}
                </div>
                <div className='more-icon'>
                    <img src={more} alt="" />
                </div>
            </div>
        </div>
    )
}

export default SingleComment;
