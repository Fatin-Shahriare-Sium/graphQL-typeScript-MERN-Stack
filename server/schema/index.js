let { gql } = require('apollo-server')
const bookmarkTypeDefs = require('./bookmark.typeDefs')
const notificationTypeDefs = require('./notification.typeDefs')
const postTypeDefs = require('./post.typeDefs')
const userProfileTypeDefs = require('./userProfile.typeDefs')
let friendTypeDefs = require('./friend.typeDefs')
const searchTypeDefs = require('./search.TypeDefs')
let UserTypeDefs = gql`

    type Details{
        myCreator:String
        project:String
    }
    "Created User obj after createUser mutation "
    type UserInDetails{
        id:String,
        email:String,
        name:String,
        profilePic: String,
        profile: String,
        posts: [String],
        notifications: [String],
        bookmarks: [String],
        createdAt:Date
    }
    type CreatedUser{
        id:String,
        email:String,
        name:String,
        profilePic:String,
        createdAt:String
    }


    type Msg{
      
        text:String
        color:String
    }

    type createUserMutationResponse{
        token:String
        user:CreatedUser
        msg:Msg
        success:Boolean
    }
    type LoginMutationResponse{
        token:String
        user:CreatedUser
        msg:Msg
        success:Boolean
    }
    type Query{
        details:Details,
        fetchUser:[UserInDetails],
        fetchUserById(userId:String!):UserInDetails
    }

    type Mutation{
        createUser(email:String!,name:String!,password:String!,gender:String!):createUserMutationResponse
        login(email:String!,password:String!):LoginMutationResponse,
        changePass(email:String!,oldPassword:String!,newPassword:String!):Msg,
        forgetPass(email:String!):Msg
    }

    

`

let RootTypeDefs = [UserTypeDefs, postTypeDefs, userProfileTypeDefs, notificationTypeDefs, bookmarkTypeDefs, friendTypeDefs, searchTypeDefs]

module.exports = RootTypeDefs
