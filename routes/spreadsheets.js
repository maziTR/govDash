// //  var express = require('express');
// //  var router = express.Router();

// // var fs = require('fs');

// // const google = require('googleapis');
// // const OAuth2 = google.auth.OAuth2;
// // const TOKEN_DIR = './credentials/';
// // const TOKEN_PATH = TOKEN_DIR + 'details.json';
// // var oauth2Client;
// // var url;
// // const SCOPES = ['https://www.googleapis.com/auth/drive'];
// // const jwt = require('jsonwebtoken');
// // const expressJwt = require('express-jwt');
// // var passport = require('passport');
// // var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// // const expressSession=require('express-session');
// // //session middleware
// // app.use(expressSession({ secret: 'thisIsASecret', resave: false, saveUninitialized: false }));
// // app.use(passport.initialize());
// // app.use(passport.session());

// // passport.serializeUser(function(user, done) {
// //     console.log(user);
// //     done(null, user);
// //   });
  
// //   passport.deserializeUser(function(user, done) {
// //     done(null, user);
// //   });
// // /* fs.readFile('./credentials/client_secret.json', function (err, data) {
// //     if (!err) {
// //         var credentials = JSON.parse(data);
// //         var clientId = credentials.web.client_id;
// //         var clientSecret = credentials.web.client_secret;
// //         var redirectUrl = credentials.web.redirect_uris[0];
// //         oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
// //         url = oauth2Client.generateAuthUrl({
// //             // 'online' (default) or 'offline' (gets refresh_token)
// //             access_type: 'offline',
// //             scope: SCOPES,
// //             // Optional property that passes state parameters to redirect URI
// //             // state: 'foo'
// //         });
// //     } else {
// //         console.log('Error loading client secret file: ' + err);
// //     }
// // });
// //  */

// // /* 
// // app.post('/form', passport.authenticate('local', { session: false }),
// //   (req, res) => {
// //     var token = jwt.sign(req.user, 'thisIsTopSecret', { expiresIn: "7d" });
// //     //send google token to db
// //     res.send({token});
// // }); */

// // //router.use(passport.initialize());

// // passport.use(new GoogleStrategy({
// //     clientID: "834900121947-juto5crlbkmmtbs89al2f97q3m2bscbi.apps.googleusercontent.com",
// //     clientSecret: "z51bBjQNgS2__hu2X8rxx6oD",
// //     callbackURL: "http://localhost:3000/api/google/auth/callback"
// //   },
// //   function(accessToken, refreshToken, profile, done) {
// //        User.findOrCreate({ googleId: profile.id }, function (err, user) {
// //         //jwt 
// //         var token = jwt.sign(user, 'thisIsTopSecret', { expiresIn: "7d" });
// //         // res.redirect('/?token='+token);
      
    
// //           console.log(accessToken)
// //           //send google token to db
// //           return done(err, user);
// //        });
// //   }
// // ));

// // router.get('/google/auth',
// // passport.authenticate('google', { scope: SCOPES })
// // );

// // router.get('/google/auth/callback', 
// //    passport.authenticate('google', { failureRedirect: '/',successRedirect: '/' })
// // //   function(req, res) {console.log("kk");
// // );
// // /* router.get('/login', function (req, res) {
// //     // Check if we have previously stored a token
// //     fs.readFile(TOKEN_PATH, function (err, data) {
// //         if (!err) {
// //             oauth2Client.credentials = JSON.parse(data);
// //             console.log(oauth2Client.credentials);
// //             res.redirect('/');
// //         } else {
// //             res.redirect(url);
// //         }
// //     });
// // }); 

// // router.get('/sheets', function (req, res) {
// //     authorize(req.query.code, function () {
// //         res.redirect('/');
// //     });
// // });
// // */
// router.get('/data', function (req, res) {
//     listFiles(oauth2Client, function(data) {
//         res.send(JSON.stringify(data));
//     });
// });

// // router.get('/data/:id', function (req, res) {
// //     getSheetsData(oauth2Client, req.params.id, function (data) {
// //         res.send(JSON.stringify(data));
// //     });
// // })

// // function authorize(code, callback) {
// //     oauth2Client.getToken(code, function (error, tokens) {
// //         console.log(code);
// //         // Now tokens contains an access_token and an optional refresh_token. Save them.
// //         if (!error) {
// //             oauth2Client.credentials = tokens;
// //             console.log(oauth2Client.credentials);
// //             storeTokens(tokens);
// //             callback();
// //         } else {
// //             console.log('Error while trying to retrieve access token', error);
// //             callback();
// //         }
// //     });
// // };

// // function storeTokens(tokens) {
// //     try {
// //         fs.mkdirSync(TOKEN_DIR);
// //     } catch (err) {
// //         if (err.code != 'EEXIST') {
// //             console.error(err);
// //         }
// //     }
// //     fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
// //     console.log('Tokens stored to ' + TOKEN_PATH);
// // }

// function listFiles(auth, callback) {
//     var drive = google.drive('v3');
//     drive.files.list({
//         auth: auth,
//         q: "mimeType='application/vnd.google-apps.spreadsheet'",
//         fields: "nextPageToken, files(id, name)"
//     }, function (err, response) {
//         if (!err) {
//             var files = response.files;
//             if (files.length == 0) {
//                 console.log('No files found.');
//             // } else {
//                 // for (var i = 0; i < files.length; i++) {
//                 //     var file = files[i];
//                 //     console.log('%s (%s)', file.name, file.id);
//                 // }
//             }
//             callback(files);
//         } else {
//             console.log('The API returned an error: ' + err);
//         }
//     });
// }

// // function getSheetsData(auth, id, callback) {
// //     var sheets = google.sheets('v4');
// //     var sheetsResult = [];
// //     sheets.spreadsheets.values.batchGet({
// //         auth: auth,
// //         spreadsheetId: id,
// //         ranges: ["'Sheet1'!A1:Z"]
// //         // ranges: ["'גיליון1'!A1:Z", "'גיליון2'!A1:Z"]
// //     }, function (err, response) {
// //         if (err) {
// //             console.log('The API returned an error: ' + err);
// //             return;
// //         }
// //         var rows = response.valueRanges;
// //         if (rows.length == 0) {
// //             console.log('No data found.');
// //         } else {
// //             for (let i = 0; i < rows.length; i++) {
// //                 sheetsResult[i] = rows[i].values;
// //             }
// //         }
// //         callback(sheetsResult);
// //     });
// // }

//  module.exports = router;