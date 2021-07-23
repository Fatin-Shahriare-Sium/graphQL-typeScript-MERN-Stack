let { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()
let mongoose = require('mongoose')

const rootResolvers = require('./resolver');
const RootTypeDefs = require('./schema');
console.log(process.env.DB_PASSWORD);
mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@social.qepvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected mongodb,Alhamdulillah');
})



let server = new ApolloServer({ typeDefs: RootTypeDefs, resolvers: rootResolvers })

server.listen(5000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    console.log('Allah is Almighty')
})