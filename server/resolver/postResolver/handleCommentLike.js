let Comment = require('../../model/comment.js');
const User = require('../../model/user.js');
const Notification = require("../../model/notification");
let handleCommentLikeMutationResolver = async (parent, args, ctx) => {
    let { commentId, userObj } = args
    console.log('handleCommentLikeMutationResolver', commentId);
    let commentx = await Comment.findOne({ _id: commentId })
    if (commentx.likes.includes(userObj.id)) {
        await Comment.findOneAndUpdate({ _id: commentId }, {
            $pull: { likes: userObj.id }
        })
        return {
            msg: `remove like to ${commentx.commentText} comment`
        }
    } else {
        await Comment.findOneAndUpdate({ _id: commentId }, {
            $push: { likes: userObj.id },
            $pull: { dislikes: userObj.id }
        })
        //add notification when user like your comment
        let newNotication = new Notification({
            notifier: userObj.id,
            notificationText: `${userObj.id == commentx.user ? 'you' : userObj.name} has liked your comment`,
            seen: false,
            type: 'Like',
            where: {
                path: 'post',
                link: commentx.postId
            }
        })

        let notificationx = await newNotication.save()

        await User.findOneAndUpdate({ _id: commentx.user }, {
            $push: { notifications: notificationx.id }
        })

        return {
            msg: `added like to ${commentx.commentText} comment`
        }
    }


}

module.exports = handleCommentLikeMutationResolver