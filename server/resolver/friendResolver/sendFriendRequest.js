const Notification = require('../../model/notification.js')
let Profile = require('../../model/Profile.js')
const User = require('../../model/user.js')

let sendFriendRequestMutationResolver = async (parent, args, ctx) => {
    let { userId, peopleId } = args

    let userx = await Profile.findOneAndUpdate({ user: userId }, {
        $push: { sendFriendRequest: peopleId }
    })


    let peopleProfilex = await Profile.findOneAndUpdate({ user: peopleId }, {
        $push: { getFriendRequest: userId }
    })

    let newNotification = new Notification({
        notifier: userId,
        notificationText: `${userx.name} has send you friend request`,
        seen: false,
        type: 'Request',
        where: {
            path: 'profile',
            link: userId
        }
    })

    let notificationx = await newNotification.save()

    await User.findOneAndUpdate({ _id: peopleId }, {
        $push: { notifications: notificationx._id }
    })


    return {
        msg: `${userx.name} send friend request to ${peopleProfilex.name}`
    }
}

module.exports = sendFriendRequestMutationResolver