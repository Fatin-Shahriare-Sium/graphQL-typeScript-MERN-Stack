let Profile = require("../../model/Profile")
let User = require("../../model/user")

let saveFriendMutationResolver = async (parent, args, ctx) => {
    let { userId, requestedUserId } = args

    await Profile.findOneAndUpdate({ _id: requestedUserId }, {
        $push: { friends: userId },
        $pull: { sendFriendRequest: userId }
    })

    let userProfilex = await Profile.findOneAndUpdate({ _id: userId }, {
        $push: { friends: requestedUserId },
        $pull: { getFriendRequest: requestedUserId }
    })

    let newNotificationx = new Notification({
        notifier: userId,
        notificationText: `${userx.name} has accepted your friend request`,
        seen: false,
        type: 'Accept',
        where: {
            path: 'profile',
            link: userId
        }
    })

    let notificationx = await newNotificationx.save()

    await User.findOneAndUpdate({ _id: requestedUserId }, {
        $push: { notifications: notificationx._id }
    })

    return {
        msg: `${userProfilex.name} has accepted you friend request `
    }

}

module.exports = saveFriendMutationResolver