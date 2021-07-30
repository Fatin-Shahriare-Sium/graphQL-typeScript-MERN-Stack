let { Schema, model } = require('mongoose')

let UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profilePic: String,
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
    //need to add notification
})

let User = model('user', UserSchema)

module.exports = User