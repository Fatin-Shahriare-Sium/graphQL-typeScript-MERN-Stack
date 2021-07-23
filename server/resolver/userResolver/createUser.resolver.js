
let User = require('../../model/user.js')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
createUserMutationResolver = async (parent, args, ctx, info) => {
    console.log(parent, args);
    let { name, email, password } = args
    let hashedPassWord = await bcrypt.hash(password, 11)
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
    let newUser = new User({
        name,
        email,
        password: hashedPassWord,
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkRUKRJvv-AznH1erobEqUZ0zrLdP8bzGFe5BSNJ5E2KQWS6Ga9-ZCIuS0wHNOIG4b758&usqp=CAU'
    })

    let userx = await newUser.save()
    let userId = userx._id
    let token = await jwt.sign({ userId }, 'secret__key')

    return {
        token,
        user: {
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