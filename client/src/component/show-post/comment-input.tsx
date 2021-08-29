import React, { useState } from 'react'
import Picker from 'emoji-picker-react';
import addEmoji from '../../assets/addEmoji.png'
import { log } from 'console';
import useLDC from '../hooks/useLDC';
import { useData } from '../../store';

interface COMMENT_INPUT {
    postId?: string,//when to comment to a post
    autoRefresher: (newCommentObj?: any, newReplyObj?: any) => any,
    type: string,//commment | reply
    commentId?: string,//when to reply a comment
    metionedUser?: string//when to reply a comment ,we need user name like @ysebajsh

}

const CommentInput: React.FC<COMMENT_INPUT> = ({ postId, autoRefresher, type, commentId, metionedUser }) => {
    let { handleCreateComment, handleCreateCommentReply } = useLDC()
    let { authUserProfileData } = useData()
    let [commentText, setCommentText] = useState<string | undefined>(metionedUser)
    let [showPalet, setShowPalet] = useState<boolean>(false)
    let [spinner, setSpinner] = useState(false)

    const onEmojiClick = (event: any, emojiDetails: any) => {
        console.log(emojiDetails.emoji);
        setCommentText(`${commentText} ${emojiDetails.emoji}`)


    }

    function handlePalet() {
        setShowPalet(pre => !pre)
    }

    function handleSpinner() {
        setSpinner(pre => !pre)
    }

    function handleCommentTextarea(e: any) {
        e.preventDefault()
        setCommentText(e.target.value)
        let element = e.target

        element.style.height = "30px";

        element.style.height = (element.scrollHeight) + "px";
    }

    async function handleCommentBtn() {
        handleSpinner()
        if (type == 'comment') {
            let { newComment } = await handleCreateComment(postId!, commentText!)
            console.log(' handleCreateComment', newComment);
            autoRefresher(newComment)
            handleSpinner()
            return setCommentText('')
        } else {
            let repliedText = commentText!
            let { newReply } = await handleCreateCommentReply(commentId!, repliedText)
            console.log(' handleCreateCommentReply', newReply);
            autoRefresher(newReply)
            return setCommentText('')

        }

    }
    if (spinner) {
        return (
            <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '10vh' }}>
                <div style={{ width: '23px', height: '23px' }} className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className='comment-input'>
            <div className='comment-input-wrapper'>
                <div className='comment-input__user'>
                    <img style={{ width: "27px", clipPath: 'circle()' }} src={authUserProfileData?.profileImg} alt="" />

                </div>

                <div className='comment-input__main'>
                    <textarea value={commentText} onChange={(event) => handleCommentTextarea(event)} placeholder='write your comment' />
                    <div>

                        <img onClick={handlePalet} style={{ width: '21px' }} src={addEmoji} alt="" />
                        <button onClick={() => handleCommentBtn()} style={{ height: '37px' }} className='btn btn-outline-success'>{type == 'comment' ? 'Comment' : 'Reply'}</button>
                    </div>
                    {showPalet && <div className='emoji-palet' style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }} >
                        <Picker groupVisibility={{
                            flags: false,
                            animals_nature: false,
                            food_drink: false,
                            travel_places: false,
                            objects: false

                        }} onEmojiClick={onEmojiClick} />
                    </div>}
                </div>

            </div>

        </div>
    )
}

export default CommentInput;
