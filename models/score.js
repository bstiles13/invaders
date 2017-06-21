var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var scoreSchema = new Schema({
    user: String,
    score: Number
});

var Score = mongoose.model("Score", scoreSchema);

module.exports = Score;