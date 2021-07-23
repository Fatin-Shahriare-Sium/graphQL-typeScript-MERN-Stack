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
        login: userLoginMutationResolver
    }
}

module.exports = rootResolvers