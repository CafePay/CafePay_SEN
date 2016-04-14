var mongoose = require('mongoose');
var User = require('./user');

var feedSchema = mongoose.Schema({
		subject  : String,
        feedback : String,
        owner:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Feedback', feedSchema);



