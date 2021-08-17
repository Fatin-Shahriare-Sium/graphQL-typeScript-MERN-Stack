let Comment = require('../../model/comment.js')
const Notification = require("../../model/notification");
let User = require('../../model/user')
let createCommentReplyMutationResolver = async (parent, args, ctx) => {

    let { userObj, commentId, text } = args
    let preCommentx = await Comment.findOne({ _id: commentId })
    let newComment = new Comment({
        user: userObj.id,
        postId: preCommentx._id,
        commentText: text,
        likes: [],
        dislikes: [],
        reply: [],
        parentCommentId: commentId
    })

    let commentx = await newComment.save().then(doc => doc.populate({
        path: 'user',
        select: 'name profilePic'
    }).execPopulate())


    await Comment.findOneAndUpdate({ _id: commentId }, {
        $push: { reply: commentx._id }
    })

    //add notification when user like your comment
    let newNotication = new Notification({
        notifier: userObj.id,
        notificationText: `${userObj.id == commentx.user ? 'you' : userObj.name} has replied your comment`,
        seen: false,
        type: 'Reply',
        where: {
            path: 'post',
            link: commentx.postId
        }
    })

    let notificationx = await newNotication.save()

    await User.findOneAndUpdate({ _id: commentx.user }, {
        $push: { notifications: notificationx.id }
    })

    return commentx


}

module.exports = createCommentReplyMutationResolver