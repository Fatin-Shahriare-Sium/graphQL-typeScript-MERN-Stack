let Comment = require('../../model/comment.js')
let handleCommentDislikeMutationResolver = async (parent, args, ctx) => {
    let { userId, commentId } = args

    let commentx = await Comment.findOne({ _id: commentId })

    if (commentx.dislikes.includes(userId)) {
        await Comment.findOneAndUpdate({ _id: commentId }, {
            $pull: { dislikes: userId }
        })
        return {
            msg: `remove dislike from ${commentx.commentText} comment`
        }
    } else {
        await Comment.findOneAndUpdate({ _id: commentId }, {
            $push: { dislikes: userId },
            $pull: { likes: userId }
        })
        return {
            msg: `add dislike to ${commentx.commentText} comment`
        }
    }
}

module.exports = handleCommentDislikeMutationResolver