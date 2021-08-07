const allPostGetResolver = require('./postResolver/allPostGetResolvers.js')
const createPostMutationResolver = require('./postResolver/createPost.resolver.js')
const handleLikeMutationResolver = require('./postResolver/handleLike.js')
const handleDislikeMutationResolve = require('./postResolver/handleDislike.js')
let createUserMutationResolver = require('./userResolver/createUser.resolver.js')
const userLoginMutationResolver = require('./userResolver/userLogin.resolver.js')
const createCommentMutationResolver = require('./postResolver/createCommentMutationResolver.js')

let rootResolvers = {
    Query: {
        details: () => {
            return {
                myCreator: 'Allah.All the praise belongs to Allah',
                project: 'GraphQL + MERN stack'
            }
        },
        allPosts: allPostGetResolver

    },
    Mutation: {
        createUser: createUserMutationResolver,
        login: userLoginMutationResolver,
        createPost: createPostMutationResolver,
        handleLike: handleLikeMutationResolver,
        handleDislike: handleDislikeMutationResolve,
        createComment: createCommentMutationResolver
    }
}

module.exports = rootResolvers