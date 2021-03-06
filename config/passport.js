var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../mongoose-model/user');

var google = require('googleapis');

const clientID = '834900121947-juto5crlbkmmtbs89al2f97q3m2bscbi.apps.googleusercontent.com';
const clientSecret = 'z51bBjQNgS2__hu2X8rxx6oD';

// use first line in prod, and second line in dev
// const callbackURL = 'http://gov-dash.herokuapp.com/api/google/auth/callback';
const callbackURL = 'http://localhost:3000/api/google/auth/callback';
const fileId = "1zO97T7yrioaRbnPafe6reJjF6bzVfxPqS6nTvlmJqMg";

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(clientID, clientSecret, callbackURL);

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: callbackURL,
    },
        function (accessToken, refreshToken, profile, done) {
            // make the code asynchronous - User.findOne won't fire until we have all our data back from Google
            process.nextTick(function () {

                // try to find the user based on their google id
                User.findOne({ googleId: profile.id }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        // if a user is found and authorized to view our file, log them in
                        checkAuthorization(accessToken, refreshToken, fileId, function (response) {
                            if (response) {
                                return done(null, user);
                            } else {
                                return done(null, false);
                            }
                        });
                    } else {
                        // if the user is not in our database but authorized to view our file, create a new user
                        checkAuthorization(accessToken, refreshToken, fileId, function (response) {
                            if (response) {
                                var newUser = new User({
                                    googleId: profile.id, accessToken: accessToken, refreshToken: refreshToken,
                                    name: profile.displayName
                                });
                                newUser.save(function (err) {
                                    if (err) console.error(err);
                                    return done(null, newUser);
                                });
                            } else {
                                return done(null, false);
                            }
                        });
                    }
                });
            });

        }));

    // check if the client is allowed to see our file
    function checkAuthorization(accessToken, refreshToken, fileId, callback) {
        oauth2Client.credentials = { access_token: accessToken, refresh_token: refreshToken };
        var drive = google.drive('v3');
        drive.files.list({
            auth: oauth2Client,
            q: "mimeType='application/vnd.google-apps.spreadsheet'",
            fields: "nextPageToken, files(id, name)"
        }, function (err, response) {
            var isAuthorized = false;
            if (!err) {
                var files = response.files;
                if (files.length > 0 && files.findIndex(element => element.id === fileId) > -1) {
                    isAuthorized = true;
                }
                callback(isAuthorized);
            } else {
                console.log('The API returned an error: ' + err);
                callback(false);
            }
        });
    }
};