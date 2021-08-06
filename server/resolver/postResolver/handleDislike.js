const Post = require("../../model/post")


let handleDislikeMutationResolver = async (parent, args, ctx) => {
    let { userId, postId } = args

    let postx = await Post.findOne({ _id: postId })

    if (postx.dislikes.includes(userId)) {
        await Post.findOneAndUpdate({ _id: postId }, {
            $pull: { dislikes: userId }
        })
        return {
            msg: `Remove disliked from -${postx.imgs.length > 0 ? postx.imgs[0].src : postx.text}`
        }
    } else {
        await Post.findOneAndUpdate({ _id: postId }, {
            $push: { dislikes: userId },
            $pull: { likes: userId }
        })
        return {
            msg: `add disliked to -${postx.imgs.length > 0 ? postx.imgs[0].src : postx.text}`
        }
    }
}

module.exports = handleDislikeMutationResolver