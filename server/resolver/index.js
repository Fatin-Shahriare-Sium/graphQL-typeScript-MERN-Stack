const allPostGetResolver = require('./postResolver/allPostGetResolvers.js')
const createPostMutationResolver = require('./postResolver/createPost.resolver.js')
const handleLikeMutationResolver = require('./postResolver/handleLike.js')
const handleDislikeMutationResolve = require('./postResolver/handleDislike.js')
let createUserMutationResolver = require('./userResolver/createUser.resolver.js')
const userLoginMutationResolver = require('./userResolver/userLogin.resolver.js')
const createCommentMutationResolver = require('./postResolver/createCommentMutationResolver.js')
const someCommentQueryResolver = require('./postResolver/someCommentQueryResolver.js')
const { GraphQLScalarType, Kind } = require('graphql');
const handleCommentLikeMutationResolver = require('./postResolver/handleCommentLike.js')
const handleCommentDislikeMutationResolver = require('./postResolver/handleCommentDislike.js')
const createCommentReplyMutationResolver = require('./postResolver/createCommentReply.js')
let updateUserProfileMutationResolver = require('./userProfileResolver/updateUserProfile.js')
const getUserProfileDetailsResolver = require('./userProfileResolver/getUserProfileDetails.js')
const getUserPostQueryResolver = require('./postResolver/getUserPosts.js')

let rootResolvers = {
    Query: {
        details: () => {
            return {
                myCreator: 'Allah.All the praise belongs to Allah',
                project: 'GraphQL + MERN stack'
            }
        },
        allPosts: allPostGetResolver,
        someComment: someCommentQueryResolver,
        userProfileDetails: getUserProfileDetailsResolver,
        userPosts: getUserPostQueryResolver

    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',

        parseValue(value) {
            console.log(value)
            return new Date(value); // Convert incoming integer to Date
        }
    }),
    Mutation: {
        createUser: createUserMutationResolver,
        login: userLoginMutationResolver,
        createPost: createPostMutationResolver,
        handleLike: handleLikeMutationResolver,
        handleDislike: handleDislikeMutationResolve,
        createComment: createCommentMutationResolver,
        handleCommentLike: handleCommentLikeMutationResolver,
        handleCommentDislike: handleCommentDislikeMutationResolver,
        createCommentReply: createCommentReplyMutationResolver,
        updateUserProfile: updateUserProfileMutationResolver
    }
}

module.exports = rootResolvers