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
    }],
    notifications: [{
        type: Schema.Types.ObjectId,
        ref: 'notification'
    }],
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
    //need to add notification
}, {
    timestamps: true
})

UserSchema.index({ name: 'text' })

let User = model('user', UserSchema)

module.exports = User

