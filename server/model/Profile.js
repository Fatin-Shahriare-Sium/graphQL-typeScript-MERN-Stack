let { Schema, model } = require('mongoose')

let profileSchema = new Schema({
    name: String,
    profileImg: String,
    coverImg: String,
    Address: String,
    Gender: String,
    brithDate: String
})

let Profile = model('profile', profileSchema)

module.exports = Profile