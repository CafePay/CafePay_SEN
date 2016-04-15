//Requiring dependencies ==========================================================
var express 		= require("express");
var crypto 			= require('crypto');
var jwt 			= require('jsonwebtoken');
var q 				= require('q');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var rn 				= require('random-number');
var nodemailer 		= require("nodemailer");
var generator 		= require("generate-password");

//Requiring Schemas ==========================================================
var User 			= require('./models/user');
var Item 			= require('./models/item');
var QR 				= require('./models/qrcode');
var Withdrawal 		= require('./models/withdrawal');
var Feedback 		= require('./models/feedback');
var Complaint 		= require('./models/complaint');
var Transaction 	= require('./models/transaction');
var Transactionwr 	= require('./models/transactionwr');
var Temptoken 		= require('./models/temptoken');
var config 			= require('../config/database');

var generatorOptions = {
		length:8,
		number:true,
		symbols:true,
		uppercase: true
}

var OTPoptions={
		min: 100000,
		max: 999999,
		integer: true
}

//Mail configuration =====================================================
var smtp = nodemailer.createTransport("SMTP", {
	service: "Gmail",
	auth: {
		user: "cafepaydaiict@gmail.com",
		pass: "daiict123456789"
	}
});

//Exporting vendor routes ====================================================
module.exports = function(app, vendor){
	app.use(cookieParser());

//Get profile page ==========================================================
	vendor.get('/profile', function(req, res) {
		User.findOne({username: req.decoded.username})
			.exec(function(err,doc){
				res.json({success: true, username: req.decoded.username,balance: doc.balance});
			})
			
	});

//Send complaint ==========================================================
	vendor.post('/sendcomplaint', function(req,res){
		var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
		decoded = abc;
		console.log(decoded);
		console.log(req.body)
		User.findOne({_id: decoded._id}, function(err,user){
			if(err || !user){
				console.log(err)
				res.json({success: false});
			}
			else{
				var comp = Complaint({
					subject: req.body.subject,
					complaint: req.body.complaint,
					owner: decoded._id
				})
				comp.save(function(err){
					if(err){
						console.log(err);
					}
					else{
						res.json({success: true});
					}
				});

			}
		})

	})

//Request withdrawal ==========================================================
	vendor.post('/requestwithdrawal', function(req,res){
		var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
		decoded = abc;
		console.log(decoded);
		console.log(req.body)
		User.findOne({_id: decoded._id},function(err,user){
			if(err || !user){
				console.log(err)
				console.log("hi")
				res.json({success: false});
			}
			else{
				var otp = rn(OTPoptions);
				console.log("ohoho")
				console.log(req.body.withdrawal)
				var  withdraw= Withdrawal({
					amount: req.body.withdrawal,
					OTP: otp,
					owner: decoded._id
				})
				withdraw.save(function(err){
					if(err){
						console.log(err);
					}
					else{
						mailList ={};
						mailList.to = user.email;
						mailList.subject = "OTP";
						mailList.text = 'tamaro OTP is  "'+ otp+'"';
						smtp.sendMail(mailList, function(error, response){
							if(error){
								console.log(error);
							}
							else{
								console.log("Message sent: " + response.message);
							}
						});
						res.json({success: true});
					}
				});
			}
		})
	})

var last;

//This is a to remove QR Codes from database when it scanned ==========================================================

	vendor.post('/scanqrcode/hmac',function(req,res){
		console.log(req.body.hmac)
		if (req.body.hmac == last){
			res.json({success: false , message: "scannedlast"})
			return;
		}
		var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
		decoded = abc;
		QR.findOne({hmac: req.body.hmac})
		  .populate('item', 'name price')
		  .populate('owner', 'username')
		  .select('shortid item hmac owner ctime')
		  .exec(function(err,qr){
		  	if(!qr){
		  		res.json({success: false , message: "invalid"});
		  		return;
		  	}
		  	if(qr.scanned == true){
		  		res.json({success: false , message: "invalid"});
		  		return;
		  	}
		  	if(qr){
		  		User.findOne({_id: decoded._id})
		  			.exec(function(err,vendor){
		  				vendor.balance = vendor.balance + qr.item[0].price;
		  				vendor.save();
		  				var log = new Transaction({	customer: qr.owner._id,
		  											vendor: decoded._id,
		  											code: qr,
		  											item: qr.item[0]._id,
		  											ctime: new Date().toString()
												});
		  				log.save();
		  				qr.scanned = true;
		  				last = qr.hmac;
		  				qr.remove();
					  	res.json({success: true,message: "done", balance: vendor.balance})
		  			})
		  	}
		  })
	})

//Scanning QR Codes using shortid ==========================================================
	vendor.post('/scanqrcode/shortid',function(req,res){
		console.log(req.body.id)
		var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
		decoded = abc;
		QR.findOne({shortid: req.body.id})
		  .populate('item', 'name price')
		  .populate('owner', 'username')
		  .select('shortid item hmac owner ctime')
		  .exec(function(err,qr){
		  	if(!qr){
		  		res.json({success: false , message: "invalid"});
		  		return;
		  	}
		  	if(qr.scanned == true){
		  		res.json({success: false , message: "invalid"});
		  		return;
		  	}
		  	if(qr){
		  		User.findOne({_id: decoded._id})
		  			.exec(function(err,vendor){
		  				vendor.balance = vendor.balance + qr.item[0].price;
		  				vendor.save();
		  				var log = new Transaction({	customer: qr.owner._id,
		  											vendor: decoded._id,
		  											code: qr,
		  											item: qr.item[0]._id,
		  											ctime: new Date().toString()
												});
		  				log.save();
		  				last = qr.hmac;
		  				qr.scanned = true;
		  				qr.remove();
					  	res.json({success: true,message: "done", balance: vendor.balance})
		  			})
		  	}
		  })
	})

//Get transaction logs ==========================================================
	vendor.get('/getlogs',function(req,res){
		Transaction.find({vendor: req.decoded._id})
				   .populate('item' , 'name price')
				   .populate('customer' , 'username')
				   .exec(function(err,logs){
				   		if(logs)
				   			res.json({success: true , data: logs});
				   })
	})

//Get transaction logs of withdrawal ==========================================================
	vendor.get('/getwrlogs',function(req,res){
		Transactionwr.find({owner: req.decoded.username})
		   .exec(function(err,logs){
		   	if(logs)
				res.json({success: true , data: logs});
		    })
	})

//Get amount ==========================================================
	vendor.get("/getamount",function(req,res){
		var token = req.cookies.jwt;
		var abc = jwt.decode(token, app.get('superSecret'));
		decoded = abc;
		console.log(decoded)
		User.findOne({_id: decoded._id},function(err,user){
			if(err && !user)
				console.log(err);
			else {
				res.json({balance: user.balance});
				console.log(user.balance);
			}
		})
	})
	
}