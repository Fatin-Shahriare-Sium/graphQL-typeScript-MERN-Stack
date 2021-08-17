const Notification = require("../../model/notification")
const User = require("../../model/user")

let romoveNotificationMutationResolver = async (parent, args, ctx) => {
    let { notificationId, userId } = args

    await Notification.findOneAndDelete({ _id: notificationId })

    await User.findOneAndUpdate({ _id: userId }, {
        $pull: { notifications: notificationId }
    })

    return {
        msg: `Deleted notification ${notificationId}`
    }
}

module.exports = romoveNotificationMutationResolver