const User = require("../../model/user")

let searchUserQueryResolver = async (parent, args, ctx) => {
    let { searchText } = args

    let searchedUser = await User.find({ $text: { $search: searchText } }).populate({
        path: 'profile',
        select: 'friends sendFriendRequest getFriendRequest'
    })



    return searchedUser
}

module.exports = searchUserQueryResolver