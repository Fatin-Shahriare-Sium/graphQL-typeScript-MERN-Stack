let Post = require('../../model/post.js')

let someCommentQueryResolver = async (parent, args, ctx) => {
    console.log('allPost');
    let { postId } = args
    let findedPost = await Post.findOne({ _id: postId }).populate({
        path: 'comments',
        populate: {
            path: "user",
            select: "name profilePic"
        },
        options: {
            limit: 3,
            sort: { createdAt: -1 },
        }

    })
    console.log(findedPost);
    return findedPost.comments

}

module.exports = someCommentQueryResolver