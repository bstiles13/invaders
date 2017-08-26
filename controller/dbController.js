var Score = require('../models/score.js');
var User = require('../models/user.js');

module.exports = {
    submit: function(req, res) {
        console.log("ACTIVE USER: " + req.user);
        console.log("BODY: " + req.body);
        var score = req.body.score;
        Score.create({ user: req.user.username, score: score }, function (err, small) {
            if (err) return handleError(err);
            res.json(req.body);
          })
    },

    getScores: function(req, res) {
        Score.find().sort({ score: -1 }).limit(15).exec(function (err, docs) {
            console.log(docs);
            res.json(docs);
          });
    },

    myScores: function(req, res) {
        console.log("MY SCORES: " + req.user);
        Score.find({ user: req.user.username }).sort({ score: -1 }).limit(15).exec(function (err, docs) {
            // console.log('MY SCORES: ' + docs);
            res.json(docs);
          });
    },

    myFriends: function (req, res) {
        User.find({ username: req.user.username }, function (err, data) {
      
          console.log('all: ' + data);
          console.log('username: ' + data[0].username);
          console.log('friends: ' + data[0].friends);
      
          Score.find({
            'user': { $in: data[0].friends }
          }).sort({ score: -1 }).limit(15).exec(function (err, scores) {
            console.log(scores);
            res.json(scores);
          });
        })
      },

    addFriend: function (req, res) {
    console.log(req.body.friend);
    User.find({ username: req.body.friend }).exec(function (err, docs) {
        if (err) {
        res.json({ status: "error" });
        } else if (docs.length > 0) {
        console.log(docs);
        console.log('find');
        User.update({ username: req.user.username }, { $push: { friends: req.body.friend } }, function (err, result) {
            User.find({ username: req.user.username }, function (err, data) {
    
            console.log('all: ' + data);
            console.log('username: ' + data[0].username);
            console.log('friends: ' + data[0].friends);
    
            Score.find({
                'user': { $in: data[0].friends }
            }).sort({ score: -1 }).limit(15).exec(function (err, scores) {
                console.log(scores);
                res.json(scores);
            });
            })
        })
        }
    });
    }
    
}