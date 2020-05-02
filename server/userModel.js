// User.model.js
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "can't be blank"]
    }
});
const User = mongoose.model("User", userSchema);
module.exports = User;