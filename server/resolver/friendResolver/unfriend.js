const Profile = require("../../model/Profile")

let unfriendMutationResolver = async (parent, args, ctx) => {
    let { userId, friendId } = args

    let userProfilex = await Profile.findOneAndUpdate({ user: userId }, {
        $pull: { friends: friendId }
    })

    let friendProfilex = await Profile.findOneAndUpdate({ user: friendId }, {
        $pull: { friends: userId }
    })

    return {
        msg: `${userProfilex.name} has removed ${friendProfilex.name} from his friend list`
    }
}

module.exports = unfriendMutationResolver