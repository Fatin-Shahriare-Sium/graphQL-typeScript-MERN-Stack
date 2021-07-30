const createPostMutationResolver = require('./postResolver/createPost.resolver.js')
let createUserMutationResolver = require('./userResolver/createUser.resolver.js')
const userLoginMutationResolver = require('./userResolver/userLogin.resolver.js')

let rootResolvers = {
    Query: {
        details: () => {
            return {
                myCreator: 'Allah.All the praise belongs to Allah',
                project: 'GraphQL + MERN stack'
            }
        }
    },
    Mutation: {
        createUser: createUserMutationResolver,
        login: userLoginMutationResolver,
        createPost: createPostMutationResolver
    }
}

module.exports = rootResolvers