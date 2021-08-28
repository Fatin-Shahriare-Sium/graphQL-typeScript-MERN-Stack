let Profile = require('../../model/Profile.js')


let fetchFriendListQueryResolver = async (parent, args, ctx) => {
    let { userId } = args

    let userProfilex = await Profile.findOne({ user: userId }).populate({
        path: 'friends',
        select: 'name profilePic'
    })


    return userProfilex.friends
}

module.exports = fetchFriendListQueryResolver