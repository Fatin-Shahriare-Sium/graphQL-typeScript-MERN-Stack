const User = require("../../model/user")

let fetchUserBookmarksQueryResolver = async (parent, args, ctx) => {
    let { userId } = args
    let userx = await User.findOne({ _id: userId }).populate({
        path: 'bookmarks',
        populate: {
            path: 'user',
            select: 'name profilePic'
        },
        options: {
            createdAt: '-1'
        }
    })

    return userx.bookmarks
}

module.exports = fetchUserBookmarksQueryResolver