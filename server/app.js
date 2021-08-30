let { ApolloServer, gql } = require('apollo-server')
let {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageLocalDefault

} = require("apollo-server-core")

require('dotenv').config()
let mongoose = require('mongoose');
const Post = require('./model/post');
const rootResolvers = require('./resolver');
const RootTypeDefs = require('./schema');
console.log(process.env.DB_PASSWORD);
mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@social.qepvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected mongodb,Alhamdulillah');
})


let server = new ApolloServer({
    typeDefs: RootTypeDefs,
    resolvers: rootResolvers,
    cors: true,
    playground: true,
    plugins: [
        // Install a landing page plugin based on NODE_ENV
        process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageProductionDefault({
                graphRef: "my-graph-id@my-graph-variant",
                footer: false,
            })
            : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ]
})

server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    console.log('Allah is Almighty')
})