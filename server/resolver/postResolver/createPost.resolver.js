let Post = require('../../model/post.js')
let User = require('../../model/user.js')
let createPostMutationResolver = async (parent, args, ctx) => {
    console.log(args);
    let { userId, imgs, text } = args
    let newPost = new Post({
        user: userId,
        text,
        imgs,
        likes: [],
        comments: [],
        dislikes: []
    })

    let post = await newPost.save()

    let user = await User.findOneAndUpdate({ _id: userId }, {
        $push: { 'posts': post }
    })

    console.log(post);
    return {
        _id: post._id,
        text: post.text,
        likes: post.likes,
        comments: post.comments,
        dislikes: post.dislikes,
        user: post.user,
        userName: user.name,
        profilePic: user.profilePic,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
    }

}

module.exports = createPostMutationResolver