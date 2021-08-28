let User = require('../../model/user')

let getUserProfileDetailsResolver = async (parent, args, ctx) => {
    let { userId } = args

    let userx = await User.findOne({ _id: userId }).populate({
        path: 'profile'
    }).populate({
        path: "notifications"
    })

    return {
        ...userx.profile._doc,
        notifications: userx.notifications
    }

}
module.exports = getUserProfileDetailsResolver