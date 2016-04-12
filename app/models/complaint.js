
var mongoose = require('mongoose');
var User = require('./user');

var complaintSchema = mongoose.Schema({

        subject  : String,
        complaint : String,
        owner:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

});



module.exports = mongoose.model('Complaint', complaintSchema);



