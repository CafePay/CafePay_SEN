//Requiring dependencies ================================================
var express 		= require('express');
var crypto 			= require('crypto');
var jwt 			= require('jsonwebtoken');
var q 				= require('q');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var rn 				= require('random-number');
var nodemailer 		= require('nodemailer');
var generator 		= require('generate-password');

//Requiring Schemas =====================================================
var User 			= require('./models/user');
var Item 			= require('./models/item');
var QR 				= require('./models/qrcode');
var Withdrawal 		= require('./models/withdrawal');
var Feedback 		= require('./models/feedback');
var Complaint 		= require('./models/complaint');
var Recharge 		= require('./models/recharge');
var Temptoken 		= require('./models/temptoken');
var Transactionwr 	= require('./models/transactionwr');
var config 			= require('../config/database');

var generatorOptions={
		length: 8,
		number: true,
		symbols: true,
		uppercase: true
}

var OTPoptions = {
		min: 100000,
		max: 999999,
		integer: true
}

var smtp = nodemailer.createTransport("SMTP", {
		service: "Gmail",
		auth: {
			user: "cafepaydaiict@gmail.com",
			pass: "daiict123456789"
		}
});

//Exporting committee routes ==================================================
module.exports = function(app, committee){

	app.use(cookieParser());

//Get committee profile ==========================================================
	committee.get('/profile', function(req, res) {
		res.json({success: true, username: req.decoded.username});
	});

//Get feedbacks from customer ==========================================================
	committee.get('/getfeedback', function(req,res){
		Feedback.find({})
			.select('subject feedback')
			.exec(function(err,feeds){
				if(feeds){
					res.json({success: true, data: feeds});
				}
			})
	})

//Get Recharge Request ==========================================================
	committee.get('/getrecharge', function(req,res){
		Recharge.find({})
			.populate('owner', 'username')
			.select('owner amount')
			.exec(function(err, rechas){
				if(rechas){
					res.json({success: true, data: rechas});
				}
			})
	})

//Get Withdrawal request ==========================================================
	committee.get('/getwithdrawal', function(req,res){
		Withdrawal.find({})
			.populate('owner', 'username')
			.select('owner amount')
			.exec(function(err, withs){
				if(withs){
					res.json({success: true, data: withs});
				}
			})
	})

//Approve request for withdrawal ==========================================================
	committee.post('/approvewithdrawal', function(req, res){
		Withdrawal.findOne({OTP: req.body.otp})
			.populate('owner', 'username balance')
			.select('owner amount')
			.exec(function(err, doc){
				if(!doc){
					res.json({success: false, message: "notfound"})
				}
				if(doc){
					doc.owner.balance = doc.owner.balance - doc.amount;
					doc.owner.save();

					var tran = new Transactionwr({owner: doc.owner.username,
						amount: doc.amount,
						ctime: new Date().toString()
					})

					tran.save()

					var balance = doc.owner.balance;

					doc.remove();
					res.json({success: true, balance: balance})
				}
			})
	})	

//Approve withdrawal request ==========================================================
	committee.post('/approverecharge', function(req,res){
		Recharge.findOne({OTP: req.body.otp})
			.populate('owner', 'username balance')
			.select('owner amount')
			.exec(function(err,doc){
				if(!doc){
					res.json({success: false, message: "notfound"})
				}
				if(doc){
					doc.owner.balance = doc.owner.balance + doc.amount;
					doc.owner.save();
					var tran = new Transactionwr({owner: doc.owner.username,
						amount: doc.amount,
						ctime: new Date().toString()
					})
					tran.save()
					var balance = doc.owner.balance;
					doc.remove();
					res.json({success: true, balance: doc.owner.balance})
				}
			})
	})

}