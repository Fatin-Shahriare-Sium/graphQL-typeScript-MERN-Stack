const Post = require("../../model/post")

let fetchDislikeOfPostQueryResolver = async (parent, args, ctx) => {
    let { postId } = args

    let postx = await Post.findOne({ _id: postId }).populate({
        path: 'dislikes',
        select: 'name profilePic '

    })

    return postx.dislikes
}

module.exports = fetchDislikeOfPostQueryResolver