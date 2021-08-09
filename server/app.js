let { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()
let mongoose = require('mongoose')

const rootResolvers = require('./resolver');
const RootTypeDefs = require('./schema');
console.log(process.env.DB_PASSWORD);
mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@social.qepvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected mongodb,Alhamdulillah');
})

const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

let server = new ApolloServer({ typeDefs: RootTypeDefs, resolvers: rootResolvers })

server.listen(5000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    console.log('Allah is Almighty')
})