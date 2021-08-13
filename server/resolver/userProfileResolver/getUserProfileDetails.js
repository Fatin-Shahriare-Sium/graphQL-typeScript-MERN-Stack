let User = require('../../model/user')

let getUserProfileDetailsResolver = async (parent, args, ctx) => {
    let { userId } = args

    let userx = await User.findOne({ _id: userId }).populate({
        path: 'profile'
    })

    console.log(userx);
    return userx.profile

}
module.exports = getUserProfileDetailsResolver