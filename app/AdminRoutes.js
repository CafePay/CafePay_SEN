var express = require("express");
var crypto = require('crypto');
var toString = require('json-string');
var shortid = require('shortid');
var jwt = require('jsonwebtoken');
var q = require('q');
//var time = require('time')(Date);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var rn = require("random-number");

var User = require('./models/user');
var Item = require('./models/item');
var QR = require('./models/qrcode');
var Withdrawal = require('./models/withdrawal');
var Feedback = require('./models/feedback');
var Complaint = require('./models/complaint');
//var Recharge = require('./models/recharge');
var Temptoken = require('./models/temptoken');
var config = require('../config/database');
/*var dummy = Item({name:"tea",
				  price: 10,
				  available_at: [1,3,5,7]})
dummy.save()*/
var nodemailer = require("nodemailer");
var generator = require("generate-password");
var generatorOptions={

	length:8,
	number:true,
	symbols:true,
	uppercase: true
}
var OTPoptions={
	min : 100000,
	max : 999999,
	integer : true
}
var smtp = nodemailer.createTransport("	SMTP", {
	service: "Gmail",
	auth: {
		user: "kirankatariya8778@gmail.com",
		pass: "kirudemon"
	}
});






module.exports = function(app, admin){
	app.use(cookieParser());

admin.get('/profile', function(req, res) {
			res.json({success : true});
	});


	
}