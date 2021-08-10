
let Post = require('../../model/post.js')
let Comment = require('../../model/comment.js')
let createCommentMutationResolver = async (parent, args, ctx) => {
    let { postId, userId, text } = args
    console.log(text);
    let newComment = new Comment({
        user: userId,
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

    return commentx


}

module.exports = createCommentMutationResolver