const Post = require("../../model/post")

let searchPostQueryResolver = async (parent, args, ctx) => {
    let { searchText } = args

    let searchedPosts = await Post.find({ $text: { $search: searchText } }).populate({
        path: 'user',
        select: 'name profilePic'
    })

    return searchedPosts

}

module.exports = searchPostQueryResolver