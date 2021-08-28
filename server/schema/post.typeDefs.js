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
        reply: [SingleComment],
        parentCommentId:String
    }
   
   type ExtendedSingleComment{
     _id:String,
        user:User,
        commentText: String,
        likes: [String],
        dislikes: [String],
        reply: [ExtendedSingleComment],
        parentCommentId:String,
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
         bookmarked:[String]
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

      type MuatationRespones{
        msg:String
      }

      input UserObj{
        id:String,
        name:String,
        profilePic:String
      }

      extend type Query{
        allPosts(skip:Int!):[SinglePost]
        userPosts(userId:String!):[SinglePost]
        fetchSinglePost(postId:String!):SinglePost
        someComment(postId:String!):[ExtendedSingleComment]
        fetchLikeOfPost(postId:String!):[FriendList]
        fetchDislikeOfPost(postId:String!):[FriendList]
      }


    extend type Mutation{
    createPost(text:String!,imgs:[SingleImg],userId:String!):SinglePost
    handleLike(userObj:UserObj,postId:String):HandleLikeMutationResponse
    handleDislike(userObj:UserObj,postId:String):HandleDislikeMutationResponse
    createComment(userObj:UserObj,text:String,postId:String):ExtendedSingleComment
    handleCommentLike(userObj:UserObj,commentId:String):HandleLikeMutationResponse
    handleCommentDislike(userObj:UserObj,commentId:String):HandleDislikeMutationResponse
    createCommentReply(userObj:UserObj,commentId:String,text:String):ExtendedSingleComment
    deleteSinglePost(postId:String!,userId:String!): Msg
}

`

module.exports = postTypeDefs