const { gql } = require("apollo-server");

let bookmarkTypeDefs = gql`


extend type Query{
    fetchUserBookmarks(userId:String!):[SinglePost]
}
extend type Mutation{
    createBookmark(userId:String!,postId:String!):MuatationRespones
}

`

module.exports = bookmarkTypeDefs