const Post = require("../../model/post")
let Notification = require('../../model/notification')
let User = require('../../model/user')
let handleDislikeMutationResolver = async (parent, args, ctx) => {
    let { userObj, postId } = args

    let postx = await Post.findOne({ _id: postId })

    if (postx.dislikes.includes(userObj.id)) {
        await Post.findOneAndUpdate({ _id: postId }, {
            $pull: { dislikes: userObj.id }
        })
        return {
            msg: `Remove disliked from -${postx.imgs.length > 0 ? postx.imgs[0].src : postx.text}`
        }
    } else {
        await Post.findOneAndUpdate({ _id: postId }, {
            $push: { dislikes: userObj.id },
            $pull: { likes: userObj.id }
        })

        let newNotification = new Notification({
            notifier: userObj.id,
            notificationText: `${userObj.id == postx.user ? 'you' : userObj.name} has disliked your post`,
            seen: false,
            type: 'Dislike',
            where: {
                path: 'post',
                link: postx._id
            }
        })

        let notificationx = await newNotification.save()
        await User.findOneAndUpdate({ _id: postx.user }, {
            $push: { notifications: notificationx._id }
        })

        return {
            msg: `add disliked to -${postx.imgs.length > 0 ? postx.imgs[0].src : postx.text}`
        }
    }
}

module.exports = handleDislikeMutationResolver