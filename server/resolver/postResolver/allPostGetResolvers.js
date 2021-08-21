

const Post = require("../../model/post");
const Profile = require("../../model/Profile");


let allPostGetResolver = async (parent, args, ctx) => {
    // await Profile.findOneAndUpdate({ _id: '611904bc1a08000ff0c8db43' }, {
    //     $set: { user: '611904bc1a08000ff0c8db45' }
    // })
    let posts = await Post.find().populate({
        path: "user",
        select: 'name profilePic'
    })

    return posts
}

module.exports = allPostGetResolver