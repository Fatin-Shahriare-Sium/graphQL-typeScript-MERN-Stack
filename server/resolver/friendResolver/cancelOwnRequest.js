const Profile = require("../../model/Profile")

let cancelOwnRequestMutationResolver = async (parent, args, ctx) => {
    //cancelling own request
    let { userId, requestedUserId } = args

    let userProfile = await Profile.findOneAndUpdate({ user: userId }, {
        $pull: { sendFriendRequest: requestedUserId }
    })

    let requestedUserProfile = await Profile.findOneAndUpdate({ user: requestedUserId }, {
        $pull: { getFriendRequest: userId }
    })

    return {
        msg: `${userProfile.name} has cancelled his own request of ${requestedUserProfile.name}`
    }
}

module.exports = cancelOwnRequestMutationResolver