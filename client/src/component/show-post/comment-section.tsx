import React from 'react'
import CommentInput from './comment-input'
interface Comment_Section {
    postId: string
}
const CommentSection: React.FC<Comment_Section> = ({ postId }) => {
    return (
        <div>
            <CommentInput postId={postId} />
        </div>
    )
}

export default CommentSection;
