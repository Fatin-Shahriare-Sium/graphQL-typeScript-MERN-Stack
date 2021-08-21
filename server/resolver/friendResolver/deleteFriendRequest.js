const Profile = require("../../model/Profile")

let deleteFriendRequestMutationResolver = async (parent, args, ctx) => {
    let { userId, requestedUserId } = args

    let requestedUserProfile = await Profile.findOneAndUpdate({ user: requestedUserId }, {
        $pull: { sendFriendRequest: userId }
    })

    let userProfile = await Profile.findOneAndUpdate({ user: userId }, {
        $pull: { getFriendRequest: requestedUserId }
    })

    return {
        msg: `${userProfile.name} has delete ${requestedUserProfile.name}'s friend request`
    }
}

module.exports = deleteFriendRequestMutationResolver