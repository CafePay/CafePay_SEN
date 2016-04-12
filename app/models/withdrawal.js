
var mongoose = require('mongoose');
var User = require('./user');

var withdrawalSchema = mongoose.Schema({

        amount : Number,
        OTP : Number,
        owner:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

});



module.exports = mongoose.model('Withdrawal', withdrawalSchema);



