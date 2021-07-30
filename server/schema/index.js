let { gql } = require('apollo-server')
const postTypeDefs = require('./post.typeDefs')
let UserTypeDefs = gql`

    type Details{
        myCreator:String
        project:String
    }
    "Created User obj after createUser mutation "
    type CreatedUser{
        id:String,
        email:String,
        name:String,
        profilePic:String
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
        details:Details
    }

    type Mutation{
        createUser(email:String!,name:String!,password:String!,gender:String!):createUserMutationResponse
        login(email:String!,password:String!):LoginMutationResponse
    }

    

`

let RootTypeDefs = [UserTypeDefs, postTypeDefs]

module.exports = RootTypeDefs