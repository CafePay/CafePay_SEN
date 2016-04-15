//This is Schema to store token temporary
var mongoose = require('mongoose');
var User = require('./user');

var tempSchema = mongoose.Schema({
        token : String,
        valid : Boolean
});

module.exports = mongoose.model('Temptoken', tempSchema);



