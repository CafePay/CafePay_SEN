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






module.exports = function(app, vendor){
	app.use(cookieParser());



	vendor.get('/profile', function(req, res) {
			res.json({success : true});
	});

vendor.post('/sendcomplaint',function(req,res){

			var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
			decoded = abc;
			console.log(decoded);
			console.log(req.body)
			User.findOne({_id : decoded._id},function(err,user){
				if(err || !user){
					console.log(err)
					console.log("hi")
					res.json({success : false});
				}
				else{

					var comp = Complaint({
						subject : req.body.subject,
						complaint : req.body.complaint,
						owner : decoded._id
					})
					comp.save(function(err){
						if(err){
							console.log(err);
						}else{
							res.json({success : true});
						}
					});

				}
			})

})


	
vendor.post('/requestwithdrawal',function(req,res){

			var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
			decoded = abc;
			console.log(decoded);
			console.log(req.body)
			User.findOne({_id : decoded._id},function(err,user){
				if(err || !user){
					console.log(err)
					console.log("hi")
					res.json({success : false});
				}
				else{


					var otp = rn(OTPoptions);
					console.log("ohoho")
					console.log(req.body.withdrawal)
					var  withdraw= Withdrawal({
						amount : req.body.withdrawal,
						OTP : otp,
						owner : decoded._id
					})



					withdraw.save(function(err){
						if(err){
							console.log(err);
						}else{

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
							res.json({success : true});
						}
					});

				}
			})

})

vendor.post('/scanqrcode',function(req,res){
	console.log(req.body)
	res.json({gaurav : "fuckerrrr"})
})
	
}