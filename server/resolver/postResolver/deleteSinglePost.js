const Post = require("../../model/post")
const User = require("../../model/user")

let deleteSinglePostMutationResolver = async (parent, args, ctx) => {
    let { userId, postId } = args

    await Post.deleteOne({ _id: postId })

    await User.findOneAndUpdate({ _id: userId }, {
        $pull: { posts: postId }
    })

    return {
        text: 'Successfully,deleted your post',
        color: 'success'
    }
}

module.exports = deleteSinglePostMutationResolver