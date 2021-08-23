let User = require('../../model/user.js')
let bcrypt = require('bcrypt')
let changePasswordMutationResolver = async (parent, args, ctx) => {
    let { email, oldPassword, newPassword } = args

    let hasUser = await User.find({ email: email })

    if (hasUser.length <= 0) {
        return {
            text: 'Email is not valid',
            color: 'danger'
        }
    }



    let userx = await User.findOne({ email })

    let match = await bcrypt.compare(oldPassword, userx.password)


    if (!match) {
        return {
            text: 'Password is not matching to your account',
            color: 'danger'
        }
    }

    let hashedPass = await bcrypt.hash(newPassword, 11)

    await User.findOneAndUpdate({ email }, {
        $set: { password: hashedPass }
    })

    return {
        text: 'Successfully, created a new password',
        color: 'success'
    }
}

module.exports = changePasswordMutationResolver