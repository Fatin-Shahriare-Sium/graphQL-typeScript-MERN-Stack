const Post = require("../../model/post");

let handleLikeMutationResolver = async (parent, args, ctx) => {

    let { userId, postId } = args
    console.log(args);
    let postx = await Post.findOne({ _id: postId })
    if (postx.likes.includes(userId)) {
        await Post.findOneAndUpdate({ _id: postId }, {
            $pull: { likes: userId }
        })
        return {
            msg: `Remove liked from -${postx.imgs.length > 0 ? postx.imgs[0].src : postx.text}`
        }
    } else {
        await Post.findOneAndUpdate({ _id: postId }, {
            $push: { likes: userId },
            $pull: { dislikes: userId }
        })
        return {
            msg: `add like to -${postx.imgs.length > 0 ? postx.imgs[0].src : postx.text}`
        }
    }
    // if (user.isLiked) {
    //     let postx = await Post.findOneAndUpdate({ _id: postId }, {
    //         $pull: { likes: user.id }
    //     })
    //     return {
    //         msg: `Remove liked from -${postx.imgs.length > 0 ? postx.imgs[0].src : postx.text}`
    //     }
    // } else {
    //     let postx = await Post.findOneAndUpdate({ _id: postId }, {
    //         $push: { likes: user.id },
    //         $pull: { dislikes: user.id }
    //     })
    //     return {
    //         msg: `add like to -${postx.imgs.length > 0 ? postx.imgs[0].src : postx.text}`
    //     }
    // }


}

module.exports = handleLikeMutationResolver