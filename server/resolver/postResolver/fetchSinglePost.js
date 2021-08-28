let Post = require('../../model/post')


let fetchSinglePostQueryResolver = async (parent, args, ctx) => {
    let { postId } = args

    let postx = await Post.findOne({ _id: postId })
    console.log('postx', postx);
    return postx
}

module.exports = fetchSinglePostQueryResolver