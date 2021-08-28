const User = require("../../model/user")

let fetchNotificationsQueryResolver = async (parent, args, ctx) => {
    let { userId } = args

    let userx = await User.findOne({ _id: userId }).populate({
        path: 'notifications',
        populate: {
            path: 'notifier',
            select: 'name profilePic'
        },
        options: {
            sort: {
                createdAt: '-1'
            }
        }
    })

    return userx.notifications
}

module.exports = fetchNotificationsQueryResolver