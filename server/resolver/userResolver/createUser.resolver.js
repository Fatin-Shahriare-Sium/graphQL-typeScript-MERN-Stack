
let User = require('../../model/user.js')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt');
const Profile = require('../../model/Profile.js');

createUserMutationResolver = async (parent, args, ctx, info) => {
    console.log(args);
    let { name, email, password, gender } = args
    let alreadyUsed = await User.find({ email: email })

    if (alreadyUsed.length > 0) {
        return {
            token: '',
            user: {},
            msg: {
                text: 'Already,created account with this email',
                color: 'danger'
            },
            success: false
        }
    }
    let newProfile = new Profile({
        name,
        profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkRUKRJvv-AznH1erobEqUZ0zrLdP8bzGFe5BSNJ5E2KQWS6Ga9-ZCIuS0wHNOIG4b758&usqp=CAU',
        coverImg: '',
        address: '',
        brithDate: '',
        friends: [],
        sendFriendRequest: [],
        getFriendRequest: []
    })

    let profilex = await newProfile.save()

    let hashedPassWord = await bcrypt.hash(password, 11)

    let newUser = new User({
        name,
        email,
        password: hashedPassWord,
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkRUKRJvv-AznH1erobEqUZ0zrLdP8bzGFe5BSNJ5E2KQWS6Ga9-ZCIuS0wHNOIG4b758&usqp=CAU',
        profile: profilex._id,
        posts: [],
        notifications: [],
        bookmarks: []
    })

    let userx = await newUser.save()

    await Profile.findOneAndUpdate({ _id: profilex._id }, {
        $set: { user: userx._id }
    })

    let userId = userx._id
    let token = await jwt.sign({ userId }, 'secret__key')

    return {
        token,
        user: {
            id: userx._id,
            name: userx.name,
            email: userx.email,
            profilePic: userx.profilePic
        },
        msg: {
            text: 'Successfully,created an account',
            color: 'success'
        },
        success: true
    }

}

module.exports = createUserMutationResolver