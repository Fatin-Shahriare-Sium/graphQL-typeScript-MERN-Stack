let { Schema, model } = require('mongoose')

let notificationSchema = new Schema({
    notifier: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    notificationText: String,
    type: String,

}, {
    timestamps: true
})

let Notification = model('notification', notificationSchema)

module.exports = Notification