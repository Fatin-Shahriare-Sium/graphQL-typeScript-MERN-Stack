const User = require("../../model/user")


let getUserPostQueryResolver = async (parent, args, ctx) => {
    let { userId } = args

    let userx = await User.findOne({ _id: userId }).populate({
        path: 'posts',
        populate: {
            path: 'user',
            select: 'profilePic name'
        },
        options: {
            sort: { createdAt: -1 }
        }
    })

    return userx.posts
}

module.exports = getUserPostQueryResolver