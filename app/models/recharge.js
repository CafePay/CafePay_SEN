
var mongoose = require('mongoose');
var User = require('./user');

var rechargeSchema = mongoose.Schema({

        amount : Number,
        OTP : Number,
        owner:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});



module.exports = mongoose.model('Recharge', rechargeSchema);



