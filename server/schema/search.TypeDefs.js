const { gql } = require("apollo-server");

let searchTypeDefs = gql`



type UserDetails{
    id:String,
    name:String,
    profilePic:String,
    posts:[String],
    profile:UserProfileDetails

}
extend type Query{
    searchUser(searchText:String):[UserDetails],
    searchPost(searchText:String):[SinglePost]

}

`

module.exports = searchTypeDefs