var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
        id: String,
        token: String,
        email: String,
        name: String,
        username: String,
        friends: [String]
});

var User = mongoose.model("User", userSchema);

module.exports = User;