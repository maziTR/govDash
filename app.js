const express = require('express');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const spreadSheet = require('./routes/spreadsheets');
//Authentication
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

//Authentication middleware

app.use(passport.initialize());

passport.use(new LocalStrategy(
  //    { passReqToCallback : true},
    function(username, password, done) {
      if ((username === "john") && (password === "password")) {
        return done(null, { username: username, id: 1 });
      } else {
        return done(null, false, "Failed to login.");
      }
    }
  )); 

  const checkIfAuthenticated = expressJwt({
    secret: 'thisIsTopSecret'
});

  app.post('/userDetails',checkIfAuthenticated, function (req, res){
      res.send(req.body);
  });

app.get('/logout', function (req, res) {
  req.logout();
  res.send('Logged out!');
});

app.post('/form', passport.authenticate('local', { session: false }),
  (req, res) => {
    var token = jwt.sign(req.user, 'thisIsTopSecret', { expiresIn: "7d" });
    res.send({token});
});

app.use( express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/api', spreadSheet);

app.get('*', function(req, res) {
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