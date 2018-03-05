const express = require('express');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const spreadSheet = require('./routes/spreadsheets');
const app = express();

const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const TOKEN_DIR = './credentials/';
const TOKEN_PATH = TOKEN_DIR + 'details.json';
var oauth2Client;
var url;
const SCOPES = ['https://www.googleapis.com/auth/drive'];
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const expressSession=require('express-session');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

//session middleware
app.use(expressSession({ secret: 'thisIsASecret', resave: false, saveUninitialized: false, session:true}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  function authOnly(req,res,next){
    if (req.isAuthenticated()){
       next();
    } else {
        res.redirect('/');
    }
  }

//Authentication middleware?

app.use( express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist'))); 

passport.use(new GoogleStrategy({
  clientID: "834900121947-juto5crlbkmmtbs89al2f97q3m2bscbi.apps.googleusercontent.com",
  clientSecret: "z51bBjQNgS2__hu2X8rxx6oD",
  callbackURL: "http://localhost:3000/api/google/auth/callback",
  passReqToCallback   : true
},
function(accessToken, refreshToken, profile, done) {
     User.findOrCreate({ googleId: profile.id }, function (err, user) {
        console.log(refreshToken)
        //send google token to db
        return done(err, user);
     });
}
));

/* app.get('/', function(req, res){
  res.render('index', { user: req.user });
}); */

app.get('api/google/auth',
passport.authenticate('google', { scope: SCOPES })
);

app.get( 'api/google/auth/callback', 
    	passport.authenticate( 'google', { 
    		successRedirect: '/',
    		failureRedirect: '/'
}));

app.get('*',authOnly, function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;