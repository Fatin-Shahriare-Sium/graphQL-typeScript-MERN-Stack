const User = require("../../model/user")
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let userLoginMutationResolver = async (parent, args, ctx) => {
    let { email, password } = args
    let userx = await User.findOne({ email })
    if (!userx) {
        return {
            token: "",
            user: "",
            success: false,
            msg: {
                text: 'Failed to login.Wrong credentials',
                color: 'danger'
            }
        }
    }

    let passed = await bcrypt.compare(password, userx.password)

    if (passed) {
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
            success: true,
            msg: {
                text: 'Successfully,login to your account',
                color: 'success'
            }
        }
    } else {
        return {
            token: "",
            user: "",
            success: false,
            msg: {
                text: 'Failed to login.Wrong credentials',
                color: 'danger'
            }
        }
    }
}

module.exports = userLoginMutationResolver