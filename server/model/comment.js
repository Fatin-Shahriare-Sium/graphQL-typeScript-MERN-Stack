let { Schema, model } = require('mongoose')

let commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    userName: String,
    profilePic: String,
    commentText: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    reply: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]

}, {
    timestamps: true
})

let Comment = model('comment', commentSchema)

module.exports = Comment