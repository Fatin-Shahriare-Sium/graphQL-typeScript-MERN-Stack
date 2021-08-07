
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
        reply: []
    })

    let commentx = await newComment.save()
    let postx = await Post.findOneAndUpdate({ _id: postId }, {
        $push: { 'comments': commentx._id }
    })

    return {
        msg: `added comment to ${postx.text} `
    }
}

module.exports = createCommentMutationResolver