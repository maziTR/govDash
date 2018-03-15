const express = require('express');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

const passport = require('passport');
const expressSession = require('express-session');

// var configAuth = require('./config/auth');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
// var oauth2Client = new OAuth2(configAuth.googleAuth.clientID, configAuth.googleAuth.clientSecret,
//   configAuth.googleAuth.callbackURL);

// use first line in prod, and second line in dev
// var oauth2Client = new OAuth2('834900121947-juto5crlbkmmtbs89al2f97q3m2bscbi.apps.googleusercontent.com',
// 'z51bBjQNgS2__hu2X8rxx6oD', 'http://gov-dash.herokuapp.com/api/google/auth/callback');
var oauth2Client = new OAuth2('834900121947-juto5crlbkmmtbs89al2f97q3m2bscbi.apps.googleusercontent.com',
'z51bBjQNgS2__hu2X8rxx6oD', 'http://localhost:3000/api/google/auth/callback');

var app = express();

mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/configDB');

require('./config/passport')(passport);

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//session middleware
app.use(expressSession({ secret: 'ilovecatsanddogstoo', resave: false, saveUninitialized: false }));

// authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// routes for google authentication
app.get('/api/google/auth', passport.authenticate('google',
  { scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/plus.login'], accessType: 'offline' }));

app.get('/api/google/auth/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/login-error'
}));

// get the sheets data from the users file
app.get('/api/data', isLoggedIn, function (req, res) {
  oauth2Client.credentials = { access_token: req.user.accessToken, refresh_token: req.user.refreshToken };
  _getSheetsData(oauth2Client, "1zO97T7yrioaRbnPafe6reJjF6bzVfxPqS6nTvlmJqMg", function (data) {
    res.send(JSON.stringify(data));
  });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the login page
  res.redirect('/');
}

// helper function to get the sheets data from the users file
function _getSheetsData(auth, id, callback) {
  var sheets = google.sheets('v4');
  var sheetsResult = [];
  sheets.spreadsheets.values.batchGet({
    auth: auth,
    spreadsheetId: id,
    ranges: ["'DATA'"]
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.valueRanges;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      for (let i = 0; i < rows.length; i++) {
        sheetsResult[i] = rows[i].values;
      }
    }
    callback(sheetsResult);
  });
}

// get user details (user name) from cookie
app.get('/api/userDetails', isLoggedIn, function (req, res) {
  if (req.user) {
    res.send({name: req.user.name});
  }
  next();
});

// route for logging out
app.get('/logout', isLoggedIn, function (req, res) {
  req.logout();
  res.redirect('/');
});

// route for unauthorized user
app.get('/login-error', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/app/unauthorized.html'));
});

// privacy policy route - might be removed later
app.get('/privacy', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/privacypolicy.html'));
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('*', isLoggedIn, function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end({ error: err });
});

module.exports = app;