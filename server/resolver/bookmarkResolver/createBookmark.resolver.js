const Post = require("../../model/post")
const User = require("../../model/user")

let createBookmarkMutationResolver = async (parent, args, ctx) => {
    let { userId, postId } = args
    let userx = await User.findOne({ _id: userId })

    if (userx.bookmarks.includes(postId)) {
        await User.findOneAndUpdate({ _id: userId }, {
            $pull: { bookmarks: postId }
        })
        await Post.findOneAndUpdate({ _id: postId }, {
            $pull: { bookmarked: userId }
        })
    } else {
        await User.findOneAndUpdate({ _id: userId }, {
            $push: { bookmarks: postId }
        })
        await Post.findOneAndUpdate({ _id: postId }, {
            $push: { bookmarked: userId }
        })
    }

    return {
        msg: `${userx.name}has bookmarked a post - ${postId}`
    }
}

module.exports = createBookmarkMutationResolver;