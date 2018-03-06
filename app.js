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

var app = express();

mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/configDB');

require('./config/passport')(passport); // pass passport for configuration

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//session middleware
app.use(expressSession({ secret: 'ilovecatsanddogstoo', resave: false, saveUninitialized: false }));

// authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// route for logging out
app.get('/logout', function (req, res) {
  req.logout();
  res.send('Logged out!');
  // res.redirect('/');
});

app.get('/api/google/auth', passport.authenticate('google', 
  { scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/plus.login'], accessType: 'offline' }));

app.get('/api/google/auth/callback',
  passport.authenticate('google', {
    successRedirect: '/execution',
    failureRedirect: '/'
}));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the login page
    res.redirect('/');
}

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
  res.json({error: err});
});

module.exports = app;