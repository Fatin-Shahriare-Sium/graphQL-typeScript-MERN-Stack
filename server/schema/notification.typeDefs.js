const { gql } = require("apollo-server");

let notificationTypeDefs = gql`
type Where{
    path:String,
    link:String
}
type SingleNotification{
    id:String,
    notifier:User,
    notificationText: String,
    seen: Boolean,
    type: String,
    where:Where
    createdAt:Date

}

extend type Query{
    fetchUserNotifications(userId:String!):[SingleNotification]
}

extend type Mutation{
    removeNotification(notificationId:String!,userId:String!):MuatationRespones,
    notificationWatch(notificationId:String!):MuatationRespones
}

`

module.exports = notificationTypeDefs