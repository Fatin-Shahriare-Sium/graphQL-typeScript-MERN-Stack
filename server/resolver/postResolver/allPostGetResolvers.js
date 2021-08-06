const Post = require("../../model/post")

let allPostGetResolver = async (parent, args, ctx) => {

    let posts = await Post.find().populate({
        path: "user",
        select: 'name profilePic'
    })
    console.log(posts);
    return posts
}

module.exports = allPostGetResolver