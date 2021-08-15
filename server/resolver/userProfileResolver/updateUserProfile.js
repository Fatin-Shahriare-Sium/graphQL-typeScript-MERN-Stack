let User = require('../../model/user')
let Profile = require('../../model/Profile')
let updateUserProfileMutationResolver = async (parent, args, ctx) => {

    let { userId, profileId, name, bio, coverImg, profilePic, address, birthdate } = args


    let profilex = await Profile.findOneAndUpdate({ _id: profileId }, {
        $set: {
            name,
            profileImg: profilePic,
            coverImg,
            address,
            bio,
            brithDate: birthdate
        }
    })


    let userx = await User.findOneAndUpdate({ _id: userId }, {
        $set: { name, profilePic }
    })

    return {
        msg: `updated profile of ${userx.name}`
    }
}

module.exports = updateUserProfileMutationResolver