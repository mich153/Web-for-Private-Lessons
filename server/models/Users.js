const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        first_name: String,
        last_name: String,
        phone: Number,
        change_password_date: {
            type: Date,
            default: Date.now()
        },
        type:{
            type: String,
            require: true
        }
    }
);

module.exports = mongoose.model("users", UserSchema);