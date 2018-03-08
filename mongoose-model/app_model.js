var mongoose = require('mongoose');

var AppSchema = new mongoose.Schema({
    clientID: String,
    clientSecret: String,
    callbackURL: String
});

module.exports = mongoose.model('App', AppSchema);