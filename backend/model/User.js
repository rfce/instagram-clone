const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    fullname: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: String,
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)
