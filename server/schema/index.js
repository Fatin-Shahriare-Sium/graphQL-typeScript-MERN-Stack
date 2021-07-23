let { gql } = require('apollo-server')
let RootTypeDefs = gql`

    type Details{
        myCreator:String
        project:String
    }
    "Created User obj after createUser mutation "
    type CreatedUser{
        email:String,
        name:String,
        password:String,
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
        createUser(email:String!,name:String!,password:String!):createUserMutationResponse
        login(email:String!,password:String!):LoginMutationResponse
    }

    

`

module.exports = RootTypeDefs