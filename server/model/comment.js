let { Schema, model } = require('mongoose')

let commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    commentText: String,
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
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
    }],
    parentCommentId: String,

}, {
    timestamps: true
})

let Comment = model('comment', commentSchema)

module.exports = Comment