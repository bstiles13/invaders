//Dependecies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
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

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/fail' }));

app.get("/test", function(req, res) {
  console.log(req.user);
  console.log(activeUser);
});

app.get("/", function(req, res) {
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
		callbackURL: 'http://localhost:8080/auth/facebook/callback',
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
