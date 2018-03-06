var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../mongoose-model/user');
var configAuth = require('./auth');

module.exports = function (passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {
        // make the code asynchronous - User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ googleId : profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user is not in our database, create a new user
                    var newUser = new User({googleId: profile.id, accessToken: accessToken, refreshToken: refreshToken,
                        name: profile.displayName });
                    newUser.save(function(err) {
                        if (err) console.error(err);
                        return done(null, newUser);
                    });
                }
            });
        });

    }));

};