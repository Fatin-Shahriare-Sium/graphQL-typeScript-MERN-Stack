let Comment = require('../../model/comment.js')

let handleCommentLikeMutationResolver = async (parent, args, ctx) => {
    let { commentId, userId } = args
    console.log('handleCommentLikeMutationResolver', commentId);
    let commentx = await Comment.findOne({ _id: commentId })
    if (commentx.likes.includes(userId)) {
        await Comment.findOneAndUpdate({ _id: commentId }, {
            $pull: { likes: userId }
        })
        return {
            msg: `remove like to ${commentx.commentText} comment`
        }
    } else {
        await Comment.findOneAndUpdate({ _id: commentId }, {
            $push: { likes: userId },
            $pull: { dislikes: userId }
        })
        return {
            msg: `added like to ${commentx.commentText} comment`
        }
    }


}

module.exports = handleCommentLikeMutationResolver