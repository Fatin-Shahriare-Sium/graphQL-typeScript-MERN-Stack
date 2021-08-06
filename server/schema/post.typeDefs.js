const { gql } = require("apollo-server");

let postTypeDefs = gql`
   
   
    type SingleComment{
        user:String,
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

      type User{
        _id:String,
        name:String,
        profilePic:String
      }

      type SinglePost_Img{
        id:String,
        src:String
      }

      type SinglePost{
        _id:String,
          text:String,
          likes: [String],
         comments: [SingleComment],
         dislikes: [String],
         user: User,
         createdAt: String,
         imgs:[SinglePost_Img],
         updatedAt: String,
      }

      input SingleImg{
          id:String,
          src:String
      }

  
      type HandleLikeMutationResponse{
        msg:String
      }

      type HandleDislikeMutationResponse{
        msg:String
      }

      extend type Query{
        allPosts:[SinglePost]
      }


    extend type Mutation{
    createPost(text:String!,imgs:[SingleImg],userId:String!):CreatedPostMutationResponse
    handleLike(userId:String,postId:String):HandleLikeMutationResponse
    handleDislike(userId:String,postId:String):HandleDislikeMutationResponse
}

`

module.exports = postTypeDefs