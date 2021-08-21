let { Schema, model } = require('mongoose')

let profileSchema = new Schema({
    name: String,
    profileImg: String,
    coverImg: String,
    address: String,
    bio: String,
    brithDate: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    sendFriendRequest: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    getFriendRequest: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})

let Profile = model('profile', profileSchema)

module.exports = Profile