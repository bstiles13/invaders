var express = require('express');
var dbController = require('./dbController.js');

var router = new express.Router();


// Signs out of passport session and redirects to homepage
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Determines if a user is signed in and, if true, sends the user information to the browser
router.post("/confirm", function (req, res) {
  // console.log("TEST: " + req.isAuthenticated());
  // console.log("REQ USER: " + req['user']);
  res.json(req.user);
});

// Saves new user scores to Mongo
router.post("/submit", dbController.submit);

// Queries global score history from Mongo and populates Scores page
router.get("/getscores", dbController.getScores);

// Queries personal score history from Mongo and populates Scores page (if signed in)
router.post("/myscores", dbController.myScores);

// Queries friend score history from Mongo and populates Scores page (if signed in)
router.post("/myfriends", dbController.myFriends);

// Receives user input and adds a friend to user account/friend list
router.post('/addfriend', dbController.addFriend);

// Homepage
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;