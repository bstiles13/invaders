var express = require('express');
var dbController = require('./dbController.js');

var router = new express.Router();




router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.post("/confirm", function (req, res) {
  console.log("TEST: " + req.isAuthenticated());
  console.log("REQ USER: " + req['user']);
  res.json(req.user);
});

router.post("/submit", dbController.submit);

router.get("/getscores", dbController.getScores);

router.post("/myscores", dbController.myScores);

router.post("/myfriends", dbController.myFriends);

router.post('/addfriend', dbController.addFriend);

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;