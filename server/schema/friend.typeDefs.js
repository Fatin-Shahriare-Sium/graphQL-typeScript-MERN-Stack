let { gql } = require('apollo-server')
let friendTypeDefs = gql`

type FriendList{
    id:String,
    profilePic:String,
    name:String,
    updatedAt:Date
}
extend type Query{
    fetchFriendList(userId:String!):[FriendList]
}

extend type Mutation{
    sendFriendRequest(userId:String!,peopleId:String!):MuatationRespones,
    deleteFriendRequest(userId:String!,requestedUserId:String!):MuatationRespones,
    saveFriend(userId:String!,requestedUserId:String!):MuatationRespones,
    cancelOwnRequest(userId:String!,requestedUserId:String!):MuatationRespones,
    unfriend(userId:String!,friendId:String!):MuatationRespones
}

`

module.exports = friendTypeDefs