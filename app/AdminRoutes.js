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
var Transaction = require('./models/transaction');
var Transactionwr = require('./models/transactionwr');
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
			res.json({success : true, username : req.decoded.username});
	});

admin.get('/getlogs',function(req,res){



	Transaction.find({})
			   
			   .populate('item' , 'name price')
			   .populate('customer', 'username')
			   .populate('vendor' , 'username')
			   .exec(function(err,logs){


			   		if(logs)
			   			res.json({success : true , data : logs});
			   })





})

admin.get('/getwrlogs',function(req,res){



	Transactionwr.find({})
			   
			   .exec(function(err,logs){


			   		if(logs)
			   			res.json({success : true , data : logs});
			   })





})


admin.get('/getcomplaint',function(req,res){



	Complaint.find({})
			   .populate('owner', ' username')
			   .exec(function(err,feeds){


			   		if(feeds)
			   			res.json({success : true , data : feeds});
			   })





})


	
}