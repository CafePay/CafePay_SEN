
var mongoose = require('mongoose');
var User = require('./user');
var QR = require('./qrcode');
var Item = require('./item');

var transactionSchema = mongoose.Schema({

       
        code : Object,
        customer:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        item : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        ctime : String

});



module.exports = mongoose.model('Transaction', transactionSchema);



