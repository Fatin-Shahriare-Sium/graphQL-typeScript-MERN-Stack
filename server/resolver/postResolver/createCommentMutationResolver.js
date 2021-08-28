
let Post = require('../../model/post.js')
let Comment = require('../../model/comment.js');
const User = require('../../model/user.js');
const Notification = require("../../model/notification");
let createCommentMutationResolver = async (parent, args, ctx) => {
    let { postId, userObj, text } = args

    let newComment = new Comment({
        user: userObj.id,
        postId,
        commentText: text,
        likes: [],
        dislikes: [],
        reply: [],
        parentCommentId: ''
    })

    let commentx = await newComment.save().then(doc => doc.populate({
        path: 'user',
        select: 'name profilePic'
    }).execPopulate())

    let postx = await Post.findOneAndUpdate({ _id: postId }, {
        $push: { 'comments': commentx._id }
    })

    //add notification when user create comment
    let newNotication = new Notification({
        notifier: userObj.id,
        notificationText: `${userObj.id == postx.user ? 'you' : userObj.name} has commented to your post`,
        seen: false,
        type: 'Comment',
        where: {
            path: 'post',
            link: postx._id
        }
    })

    let notificationx = await newNotication.save()

    await User.findOneAndUpdate({ _id: postx.user }, {
        $push: { notifications: notificationx._id }
    })

    return commentx


}

module.exports = createCommentMutationResolver