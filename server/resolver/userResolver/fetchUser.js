const User = require("../../model/user")

let fetchUserQueryResolver = async (parent, args, ctx) => {

    let recentUsers = await User.find().sort({ createdAt: '-1' }).limit(10)
    return recentUsers
}

module.exports = fetchUserQueryResolver