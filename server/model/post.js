let { Schema, model } = require('mongoose')

let postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    text: String,
    imgs: Array,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comment"
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],


}, {
    timestamps: true
})

let Post = model('post', postSchema)

module.exports = Post