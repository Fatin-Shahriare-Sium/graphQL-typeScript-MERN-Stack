const { populate } = require('../../model/post.js');
let Post = require('../../model/post.js')

let someCommentQueryResolver = async (parent, args, ctx) => {
    console.log('allPost');
    let { postId } = args


    let findedPost = await Post.findOne({ _id: postId }).populate(
        {
            path: 'comments',
            populate: [
                {
                    path: "user",
                    select: 'name profilePic'
                },
                {
                    path: 'reply',
                    populate: {
                        path: 'user',
                        select: 'name profilePic'
                    },
                    options: {
                        limit: 5,
                        sort: { createdAt: -1 }
                    }

                }
            ],
            options: {
                sort: { createdAt: -1 },
                limit: 3
            }
        }
    )
    console.log(JSON.stringify(findedPost.comments));
    return findedPost.comments

}

module.exports = someCommentQueryResolver