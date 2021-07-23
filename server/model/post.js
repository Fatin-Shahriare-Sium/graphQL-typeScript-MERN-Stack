let { Schema, model } = require('mongoose')

let postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    postContent: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: '',
    tags: Array,
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],


}, {
    timestamps: true
})

let Post = model('post', postSchema)

module.exports = Post