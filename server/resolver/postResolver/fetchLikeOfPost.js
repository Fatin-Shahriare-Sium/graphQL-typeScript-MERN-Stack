const Post = require("../../model/post")

let fetchLikeOfPostQueryResolver = async (parent, args, ctx) => {
    let { postId } = args

    let postx = await Post.findOne({ _id: postId }).populate({
        path: 'likes',
        select: 'name profilePic updatedAt'


    })

    return postx.likes
}

module.exports = fetchLikeOfPostQueryResolver