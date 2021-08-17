let { Schema, model } = require('mongoose')

let notificationSchema = new Schema({
    notifier: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    notificationText: String,
    seen: Boolean,
    type: String,
    where: {
        path: String,
        link: String
    }

}, {
    timestamps: true
})

let Notification = model('notification', notificationSchema)

module.exports = Notification