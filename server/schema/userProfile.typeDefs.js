const { gql } = require("apollo-server");

let userProfileTypeDefs = gql`
type UserProfileDetails{
    _id:String,
    name: String,
    profileImg: String,
    coverImg: String,
    address: String,
    bio: String,
    brithDate: String,
    user:String,
    friends: [String],
    notifications:[SingleNotification]
    sendFriendRequest: [String],
    getFriendRequest: [String]
}
extend type Query{
    userProfileDetails(userId:String!):UserProfileDetails
}

extend type Mutation{
    updateUserProfile(userId:String,profileId:String,name:String,bio:String,coverImg:String,profilePic:String,address:String,birthdate:String):MuatationRespones
}

`

module.exports = userProfileTypeDefs