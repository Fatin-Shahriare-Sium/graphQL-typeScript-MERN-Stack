let { gql } = require('apollo-server')
let friendTypeDefs = gql`

extend type Mutation{
    sendFriendRequest(userId:String!,peopleId:String!):MuatationRespones,
    deleteFriendRequest(userId:String!,requestedUserId:String!):MuatationRespones,
    saveFriend(userId:String!,requestedUserId:String!):MuatationRespones,
    cancelOwnRequest(userId:String!,requestedUserId:String!):MuatationRespones
}

`

module.exports = friendTypeDefs