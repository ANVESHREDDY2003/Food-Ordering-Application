const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        unique: true,
    },
    lname: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    /* isAdmin: {
         type: Boolean,
         default: false,
     }*/
},
    {
        collection: "UserInfo",
    }
)

module.exports = mongoose.model("UserInfo", UserSchema)