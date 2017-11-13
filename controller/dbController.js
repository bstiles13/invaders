var Score = require('../models/score.js');
var User = require('../models/user.js');

module.exports = {

    // Saves new user scores to Mongo
    submit: function(req, res) {
        // console.log("ACTIVE USER: " + req.user);
        // console.log("BODY: " + req.body);
        var score = req.body.score;
        Score.create({ user: req.user.username, score: score }, function (err, small) {
            if (err) return handleError(err);
            res.json(req.body);
          })
    },

    // Queries global score history from Mongo and populates Scores page
    getScores: function(req, res) {
        Score.find().sort({ score: -1 }).limit(15).exec(function (err, docs) {
            // console.log(docs);
            res.json(docs);
          });
    },

    // Queries personal score history from Mongo and populates Scores page (if signed in)    
    myScores: function(req, res) {
        // console.log("MY SCORES: " + req.user);
        Score.find({ user: req.user.username }).sort({ score: -1 }).limit(15).exec(function (err, docs) {
            // console.log('MY SCORES: ' + docs);
            res.json(docs);
          });
    },

    // Queries friend score history from Mongo and populates Scores page (if signed in)
    myFriends: function (req, res) {
        User.find({ username: req.user.username }, function (err, data) {
      
        //   console.log('all: ' + data);
        //   console.log('username: ' + data[0].username);
        //   console.log('friends: ' + data[0].friends);
      
          Score.find({
            'user': { $in: data[0].friends }
          }).sort({ score: -1 }).limit(15).exec(function (err, scores) {
            // console.log(scores);
            res.json(scores);
          });
        })
      },

    // Receives user input and adds a friend to user account/friend list
    addFriend: function (req, res) {
    // console.log(req.body.friend);
    User.find({ username: req.body.friend }).exec(function (err, docs) {
        if (err) {
        res.json({ status: "error" });
        } else if (docs.length > 0) {
        // console.log(docs);
        User.update({ username: req.user.username }, { $push: { friends: req.body.friend } }, function (err, result) {
            User.find({ username: req.user.username }, function (err, data) {
    
            // console.log('all: ' + data);
            // console.log('username: ' + data[0].username);
            // console.log('friends: ' + data[0].friends);
    
            Score.find({
                'user': { $in: data[0].friends }
            }).sort({ score: -1 }).limit(15).exec(function (err, scores) {
                // console.log(scores);
                res.json(scores);
            });
            })
        })
        }
    });
    }
    
}