let Comment = require('../../model/comment.js')

let createCommentReplyMutationResolver = async (parent, args, ctx) => {

    let { userId, commentId, text } = args

    let newComment = new Comment({
        user: userId,
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

    return commentx


}

module.exports = createCommentReplyMutationResolver