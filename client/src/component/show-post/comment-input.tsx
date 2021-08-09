import React, { useState } from 'react'
import Picker from 'emoji-picker-react';
import addEmoji from '../../assets/addEmoji.png'
import { log } from 'console';
import useLDC from '../hooks/useLDC';
const CommentInput: React.FC<{ postId?: string, autoRefresher: () => any, type: string, commentId?: string }> = ({ postId, autoRefresher, type, commentId }) => {
    let { handleCreateComment, handleCreateCommentReply } = useLDC()
    let [commentText, setCommentText] = useState<string>()
    let [showPalet, setShowPalet] = useState<boolean>(false)

    const onEmojiClick = (event: any, emojiDetails: any) => {
        console.log(emojiDetails.emoji);
        setCommentText(`${commentText} ${emojiDetails.emoji}`)


    }

    function handlePalet() {
        setShowPalet(pre => !pre)
    }

    function handleCommentTextarea(e: any) {
        e.preventDefault()
        setCommentText(e.target.value)
        let element = e.target

        element.style.height = "30px";

        element.style.height = (element.scrollHeight) + "px";
    }

    function handleCommentBtn() {
        if (type == 'comment') {
            handleCreateComment(postId!, commentText!)
        } else {
            let repliedText = commentText!
            handleCreateCommentReply(commentId!, repliedText)
        }
        return autoRefresher()
    }

    return (
        <div className='comment-input'>
            <div className='comment-input-wrapper'>
                <div className='comment-input__user'>
                    <img style={{ width: "43px", clipPath: 'circle()' }} src="https://sportstar.thehindu.com/football/article32903363.ece/ALTERNATES/LANDSCAPE_1200/antony-ajax" alt="" />

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
