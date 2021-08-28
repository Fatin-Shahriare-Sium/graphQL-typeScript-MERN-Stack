const User = require("../../model/user")

let fetchUserByIdQueryResolver = async (parent, args, ctx) => {
    let { userId } = args

    let userx = await User.findOne({ _id: userId })

    return userx
}

module.exports = fetchUserByIdQueryResolver