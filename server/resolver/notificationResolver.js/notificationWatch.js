const Notification = require("../../model/notification")

let notificationWatchMutationResolver = async (parent, args, ctx) => {
    let { notificationId } = args

    let notificationx = await Notification.findOne({ _id: notificationId })

    if (notificationx.seen) {
        await Notification.findOneAndUpdate({ _id: notificationId }, {
            $set: { seen: false }
        })
        return {
            msg: `unseen notification - ${notificationId}`
        }
    } else {
        await Notification.findOneAndUpdate({ _id: notificationId }, {
            $set: { seen: true }
        })
        return {
            msg: `seen notification - ${notificationId}`
        }
    }

}

module.exports = notificationWatchMutationResolver