const Post = require("../../model/post");
const User = require("../../model/user");
const Notification = require("../../model/notification");
let handleLikeMutationResolver = async (parent, args, ctx) => {

    let { userObj, postId } = args
    console.log(args);

    let postx = await Post.findOne({ _id: postId })
    if (postx.likes.includes(userObj.id)) {
        await Post.findOneAndUpdate({ _id: postId }, {
            $pull: { likes: userObj.id }
        })


        return {
            msg: `Remove liked from -${postx.imgs.length > 0 ? postx.imgs[0].src : postx.text}`
        }
    } else {
        await Post.findOneAndUpdate({ _id: postId }, {
            $push: { likes: userObj.id },
            $pull: { dislikes: userObj.id }
        })
        //add notification when user like
        let newNotication = new Notification({
            notifier: userObj.id,
            notificationText: `${userObj.id == postx.user ? 'you' : userObj.name} has liked your post`,
            type: 'Like',
        })

        let notificationx = await newNotication.save()

        await User.findOneAndUpdate({ _id: postx.user }, {
            $push: { notifications: notificationx._id }
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