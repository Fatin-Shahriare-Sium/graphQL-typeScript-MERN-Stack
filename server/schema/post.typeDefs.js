const { gql } = require("apollo-server");

let postTypeDefs = gql`

   scalar Date
  #  union SingleCommentUser = String | User
  type User{
        _id:String,
        name:String,
        profilePic:String
      }

    type SingleComment{
        user:String,
        commentText: String,
        likes: [String],
        dislikes: [String],
        reply: [SingleComment]
    }
   
   type ExtendedSingleComment{
     _id:String,
        user:User,
        commentText: String,
        likes: [String],
        dislikes: [String],
        reply: [SingleComment],
        createdAt:Date
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
         createdAt: Date,
         updatedAt: Date,
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
         createdAt: Date,
         imgs:[SinglePost_Img],
         updatedAt: Date,
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
        someComment(postId:String!):[ExtendedSingleComment]
      }



    extend type Mutation{
    createPost(text:String!,imgs:[SingleImg],userId:String!):CreatedPostMutationResponse
    handleLike(userId:String,postId:String):HandleLikeMutationResponse
    handleDislike(userId:String,postId:String):HandleDislikeMutationResponse
    createComment(userId:String,text:String,postId:String):HandleDislikeMutationResponse
    handleCommentLike(userId:String,commentId:String):HandleLikeMutationResponse
    handleCommentDislike(userId:String,commentId:String):HandleDislikeMutationResponse
}

`

module.exports = postTypeDefs