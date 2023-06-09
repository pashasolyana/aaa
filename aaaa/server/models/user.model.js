const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    username: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    }
});

const Users = mongoose.model("Users", UsersSchema, "users");
module.exports = Users

