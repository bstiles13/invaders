//Dependecies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
// var axios = require('axios');
var activeUser = {};


//Define server and middleware
var PORT = process.env.PORT || 8080;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));
app.use(passport.initialize());
app.use(passport.session());

//Start MongoDB
var db = process.env.MONGODB_URI || "mongodb://localhost/invaders_db";
mongoose.connect(db, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.log("mongoose connection is successful");
  }
});
var User = require('./models/user');
var Score = require('./models/score');

app.get('/auth/facebook', passport.authenticate('facebook', {authType: 'reauthenticate', scope: ['email']}));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/fail' }));

app.get('/logout', function(req, res) {
        activeUser = {};
        req.logout(); 
        res.redirect('/');
    });

app.post('/test', function(req, res) {
  console.log(req.body);
  res.send('did something');
})

app.get("/confirm", function(req, res) {
  res.json(activeUser);
});

app.post("/submit", function(req, res) {
  console.log("ACTIVE USER: " + activeUser);
  console.log("BODY: " + req.body);
  var score = req.body.score;
  Score.create({ user: activeUser.username, score: score }, function (err, small) {
  if (err) return handleError(err);
    res.json(req.body);
})
});

app.get("/getscores", function(req, res) {
  Score.find().sort({ score: -1 }).limit(15).exec(function(err, docs){
    console.log(docs);
  	res.json(docs);
		});
});

app.get("/myscores", function(req, res) {
  Score.find({user: activeUser.username}).sort({ score: -1 }).limit(15).exec(function(err, docs){
    console.log('MY SCORES: ' + docs);
  	res.json(docs);
		});
});

app.get("/myfriends", function(req, res) {
       User.find({username: activeUser.username}, function(err, data) {

          console.log('all: ' + data);
          console.log('username: ' + data[0].username);
          console.log('friends: ' + data[0].friends);
         
          Score.find({
              'user': { $in: data[0].friends}
          }).sort({ score: -1 }).limit(15).exec(function(err, scores){
              console.log(scores);
              res.json(scores);
          });
       })
});

app.post('/addfriend', function(req, res) {
  console.log(req.body.friend);
  User.find({username: req.body.friend}).exec(function(err, docs){
    if (err) {
      res.json({status: "error"});
    } else if (docs.length > 0) {
    console.log(docs);
    console.log('find');
    User.update({username: activeUser.username}, { $push: { friends: req.body.friend}}, function(err, result) {
       User.find({username: activeUser.username}, function(err, data) {

          console.log('all: ' + data);
          console.log('username: ' + data[0].username);
          console.log('friends: ' + data[0].friends);
         
          Score.find({
              'user': { $in: data[0].friends}
          }).sort({ score: -1 }).limit(15).exec(function(err, scores){
              console.log(scores);
              res.json(scores);
          });
       })
    })
    }
  });
})

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Start the server
app.listen(PORT, function() {
  console.log("Now listening on port %s! Visit localhost:%s in your browser.", PORT, PORT);
});

//FACEBOOK LOGIN

passport.serializeUser(function(user, done){
    if (user) {
      console.log('SERIALIZE: ' + user);
      activeUser = user;
      done(null, user._id);
    }
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if (user) {
      console.log('DESERIALIZE: ' + user);
      activeUser = user;
      done(err, user);
    }
  });
});

var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
		clientID: '464260037255972',
		clientSecret: '916de8fa7a9134e64756620f48f7d00b',
		callbackURL: 'https://safe-stream-91415.herokuapp.com/auth/facebook/callback',
    profileFields: ['name', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
        User.findOne({'id': profile.id}, function(err, user){
          if(err)
            return done(err);
          if(user) {
            var existingUser = user;
            console.log(existingUser);
            return done(null, user);
          }
          else {
            console.log(profile);
            var newUser = new User();
            newUser.id = profile.id;
            newUser.token = accessToken;
            newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.email = profile.emails[0].value;
            newUser.username = profile.emails[0].value.split("@", 1);

            newUser.save(function(err){
              if(err)
                throw err;
              return done(null, newUser);
            })
            console.log(profile);
          }
        });
      });
    }

));
