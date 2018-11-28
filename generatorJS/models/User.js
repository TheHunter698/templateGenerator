const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Relation = require('mongoose-type-relation')

var userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    country: String,
    email: String,
    birthD: Date,
    use: String,
    projects: [{type: Schema.ObjectId, ref:"Project"}],
})

var userInfo = mongoose.model("user", userSchema) //The string has to be the name of the directory you are looking for

module.exports = userInfo