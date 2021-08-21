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
    bookmarked: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],


}, {
    timestamps: true
})

postSchema.index({ text: 'text' })
let Post = model('post', postSchema)

module.exports = Post