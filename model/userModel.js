const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add username"]
    },
    email: {
        type: String,
        required: [true, "please add user email"],
        unique: [true, "email already used"],
    },
    password: {
        type: String,
        required: [true, "please add user password"],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("user", userSchema);