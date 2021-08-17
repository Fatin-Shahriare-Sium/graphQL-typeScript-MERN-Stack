let Comment = require('../../model/comment.js')
const User = require('../../model/user.js')
const Notification = require("../../model/notification");
const Post = require('../../model/post.js');
let handleCommentDislikeMutationResolver = async (parent, args, ctx) => {
    let { userObj, commentId } = args

    let commentx = await Comment.findOne({ _id: commentId })

    if (commentx.dislikes.includes(userObj.id)) {
        await Comment.findOneAndUpdate({ _id: commentId }, {
            $pull: { dislikes: userObj.id }
        })
        return {
            msg: `remove dislike from ${commentx.commentText} comment`
        }
    } else {
        await Comment.findOneAndUpdate({ _id: commentId }, {
            $push: { dislikes: userObj.id },
            $pull: { likes: userObj.id }
        })

        //add notification when user like your comment
        let newNotication = new Notification({
            notifier: userObj.id,
            notificationText: `${userObj.id == commentx.user ? 'you' : userObj.name} has disliked your comment`,
            seen: false,
            type: 'Dislike',
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
            msg: `add dislike to ${commentx.commentText} comment`
        }
    }
}

module.exports = handleCommentDislikeMutationResolver