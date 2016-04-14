var mongoose = require('mongoose');
var User = require('./user');
var QR = require('./qrcode');
var Item = require('./item');

var transactionwrSchema = mongoose.Schema({
        owner : String,
        amount : Number,
        ctime : String
});

module.exports = mongoose.model('Transactionwr', transactionwrSchema);



