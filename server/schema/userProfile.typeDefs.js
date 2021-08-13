const { gql } = require("apollo-server");

let userProfileTypeDefs = gql`
type UserProfileDetails{
    id:String,
    name: String,
    profileImg: String,
    coverImg: String,
    address: String,
    bio: String,
    brithDate: String
}
extend type Query{
    userProfileDetails(userId:String!):UserProfileDetails
}

extend type Mutation{
    updateUserProfile(userId:String,name:String,bio:String,coverImg:String,profilePic:String,address:String,birthdate:String):MuatationRespones
}

`

module.exports = userProfileTypeDefs