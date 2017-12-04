//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var routes = require('./controller/routes.js');


//Define server and middleware
var PORT = process.env.PORT || 8080;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(session({
  secret: 'foo',
  cookie: {
    secure: false
  },
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);


//Start MongoDB
var User = require('./models/user.js');
var db = process.env.MONGODB_URI || "mongodb://localhost/invaders_db";
mongoose.connect(db, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log("mongoose connection is successful");
  }
});


//Facebook/Passport config
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/fail',
}));

passport.serializeUser(function (user, done) {
  if (user) {
    // console.log('SERIALIZE: ' + user);
    done(null, user._id);
  }
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (user) {
      // console.log('DESERIALIZE: ' + user);
      done(err, user);
    }
  });
});

passport.use(new FacebookStrategy({
  clientID: '464260037255972',
  clientSecret: '916de8fa7a9134e64756620f48f7d00b',
  callbackURL: 'https://invadersredux.herokuapp.com/auth/facebook/callback',
  // callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileFields: ['id', 'email', 'first_name', 'last_name'],
}, function (token, refreshToken, profile, done) {
  process.nextTick(function () {
    User.findOne({ 'id': profile.id }, function (err, user) {
      if (err)
        return done(err);
      if (user) {
        return done(null, user);
      } else {
        var newUser = new User();
        newUser.id = profile.id;
        newUser.token = token;
        newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.username = (profile.emails[0].value).split("@", 1);
        newUser.email = (profile.emails[0].value || '').toLowerCase();
        newUser.friends = [];

        newUser.save(function (err, result) {
          if (err)
            throw err;
          return done(null, newUser);
        });
      }
    });
  });
}));


// Start the server
app.listen(PORT, function () {
  console.log("Now listening on port %s! Visit localhost:%s in your browser.", PORT, PORT);
});