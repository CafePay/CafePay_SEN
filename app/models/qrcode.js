var mongoose = require('mongoose');
var User = require('./user');
var Item = require('./item');
var qrSchema = mongoose.Schema({
	shortid: String,
	hmac : String,
	owner:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
	ctime: String,
	scanned : Boolean
});

module.exports = mongoose.model('Qrcode', qrSchema);

