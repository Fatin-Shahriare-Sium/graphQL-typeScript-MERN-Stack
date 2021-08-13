let User = require('../../model/user')
let Profile = require('../../model/Profile')
let updateUserProfileMutationResolver = async (parent, args, ctx) => {

    let { userId, name, bio, coverImg, profilePic, address, birthdate } = args

    let newProfile = new Profile({
        name,
        profileImg: profilePic,
        coverImg,
        address,
        bio,
        brithDate: birthdate
    })

    let profilex = await newProfile.save()

    let userx = await User.findOneAndUpdate({ _id: userId }, {
        $set: { profile: profilex._id }
    })

    return {
        msg: `updated profile of ${userx.name}`
    }
}

module.exports = updateUserProfileMutationResolver