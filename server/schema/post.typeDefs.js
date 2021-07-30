const { gql } = require("apollo-server");

let postTypeDefs = gql`
   
   
    type SingleComment{
        user:String,
        userName: String,
        profilePic: String,
        commentText: String,
        likes: [String],
        dislikes: [String],
        reply: [SingleComment]
    }
   

      type  CreatedPostMutationResponse{
         _id:String,
          text:String,
          likes: [String],
         comments: [SingleComment],
         dislikes: [String],
         user: String,
         userName:String,
         profilePic:String,
         createdAt: String,
         updatedAt: String,
      }

      input SingleImg{
          id:String,
          src:String
      }

    extend type Mutation{
    createPost(text:String!,imgs:[SingleImg],userId:String!):CreatedPostMutationResponse
}

`

module.exports = postTypeDefs