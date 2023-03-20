const mongoose = require("mongoose")
const Schema = mongoose.Schema

const authSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    confirmPassword : {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model("Auth", authSchema)