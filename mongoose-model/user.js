var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    googleId: String,
    accessToken: String,
    refreshToken: String,
    name: String
    // password: String // probably will remove later
});

// generating a hash - probably will remove later
// UserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// checking if password is valid - probably will remove later
// UserSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

module.exports = mongoose.model('User', UserSchema);