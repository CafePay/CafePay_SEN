//Requiring dependencies =======================================================
var express 		= require("express");
var crypto 			= require('crypto');
var jwt 			= require('jsonwebtoken');
var q 				= require('q');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var rn 				= require("random-number");
var nodemailer 		= require("nodemailer");
var generator 		= require('generate-password');

//Requiring schemas ============================================================
var User 			= require('./models/user');
var Item 			= require('./models/item');
var QR 				= require('./models/qrcode');
var Withdrawal 		= require('./models/withdrawal');
var Feedback 		= require('./models/feedback');
var Complaint 		= require('./models/complaint');
var Temptoken 		= require('./models/temptoken');
var config 			= require('../config/database');

var generatorOptions={
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

//Mail configuration ==========================================================
var smtp = nodemailer.createTransport("SMTP", {
		service: "Gmail",
		auth: {
			user: "kirankatariya8778@gmail.com",
			pass: "kirudemon"
		}
});

//Exporting customer routes
module.exports = function(app, customer){
	
	app.use(cookieParser());

//Sending feedback ==========================================================
	customer.post('/sendfeedback', function(req,res){
		var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
		decoded = abc;
		User.findOne({_id: decoded._id}, function(err,user){
			if(err || !user){
				console.log(err)
				res.json({success: false});
			}
			else{

				var feed = Feedback({
					subject: req.body.subject,
					feedback: req.body.feedback,
					owner: decoded._id
				})
				feed.save(function(err){
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

//Sending complaint ==========================================================
	customer.post('/sendcomplaint', function(req,res){
		var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
		decoded = abc;
		console.log(decoded);
		console.log(req.body)
		User.findOne({_id: decoded._id}, function(err,user){
			if(err || !user){
				console.log(err)
				console.log("hi")
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

//Requesting recharge ==========================================================
	customer.post('/requestrecharge', function(req,res){
		var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
		decoded = abc;
		console.log(decoded);
		console.log(req.body)
		User.findOne({_id: decoded._id}, function(err,user){
			if(err || !user){
				console.log(err)
				console.log("hi")
				res.json({success: false});
			}
			else{
				var otp = rn(OTPoptions);
				console.log(req.body.recharge)
				var  recha= Recharge({
					amount: req.body.recharge,
					OTP: otp,
					owner: decoded._id
				})
				recha.save(function(err){
					if(err){
						console.log(err);
					}else{
						mailList ={};
						mailList.to = user.email;
						mailList.subject = "OTP";
						mailList.text = 'Your One Time Password is(OTP) "'+ otp+'"';
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

//Change password ==========================================================
	customer.post('/changepassword',function(req,res){
		console.log(req.body)
		var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
		decoded = abc;
		console.log(decoded);
		console.log(User.generateHash(req.body.oldpassword));
		User.findOne({_id: decoded._id },function(err,user){
			if(err || !user){
				console.log(err)
				res.json({success: false});
			}
			else if((req.body.newpassword != req.body.confirmpassword)
					 ||(user.validPassword(req.body.newpassword))
					 || (!user.validPassword(req.body.oldpassword))){
					res.json({success: false})
			}
			else{
				user.password = User.generateHash(req.body.newpassword);
				user.save(function(err){
					if(err){
						console.log(err);
					}else{
						res.json({success: true});
					}
				});
			}
		})
	})

//Get customer profile ==========================================================
	customer.get('/profile', function(req, res) {
		res.json({success: true});
	});

//Generate QRCode ==========================================================
	customer.post('/generate-qr-code', function(req, res){
		function create(token, data, callback){
			var abc = jwt.decode(token, app.get('superSecret'));
			decoded = abc;
			var sid= generator.generate(shortidOptions);
			gentime = new Date().toString()
			crypt = {};
			crypt.item = data;
			crypt.shortid = sid;
			console.log(crypt)
			crypt.owner = decoded.username;
			crypt.ctime = gentime;
			var key = config.qrsecret;
			var text = JSON.stringify(crypt);
			var mac = crypto.createHmac('sha256', key).update(text).digest('hex');
			var code = new QR({
				shortid: sid,
				owner: decoded._id,
				item: data._id,
				ctime: gentime,
				hmac: mac
			});
									
			code.save(function(err){
				if(err){
					console.log(err)
					callback(0);
				}
				else{
					console.log("jay 6")
					callback(1);
				}
			}

			reqdata = req.body
			arr = [];
			qsum = 0;
			for (var i=0;i<reqdata.length;i++){
			arr.push(reqdata[i]._id)
			qsum = qsum + reqdata[i].quantity;
			}
		
			Item.find({_id: { $in: arr}}, function(err,items){
			console.log("hi")
				if(err){
					console.log(err)
					res.json({success: false})
				}
			var counter = 0;
			var totalamount = 0;
			
			function callback(generated){
				counter = counter + generated;
				console.log("generated "+ generated)
				console.log("countr " + counter)
				if (generated == 0){
					
					console.log("couldn't generated")
				}
			}

			reqdata.filter(function(data){
				for(var i=0;i<items.length;i++){
					if(items[i]._id == data._id){
						totalamount = totalamount + (items[i].price*data.quantity);
					}
				}
			});

			var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
			decoded = abc;

			User.findOne({_id: decoded._id},function(err,user){
				console.log("hmm"+ totalamount + " " + counter)
				if(user.balance < totalamount){
					console.log("err")
				}
				else{
					function promise(){
					var deferred  = q.defer();
					reqdata.filter(function(data){
					for(var i=0;i<items.length;i++){
						if(items[i]._id == data._id){
							for(var j=0;j< data.quantity;j++){
								token = req.cookies.jwt;
								create(token,items[i],callback);												
							}																	
						}
					}
			})

			setTimeout(function(){
				console.log(counter)
				if(counter == qsum)
					deferred.resolve();
				else
					deferred.reject()
								}, 500);
							return deferred.promise;
							};

							promise().then(function(){
								console.log("ohh")
								user.balance = user.balance - totalamount;
								console.log(totalamount)
								user.save()
								console.log(user.balance)
								res.json({ success: true,amount: user.balance})
														},function(){
							console.log("reject")
							})
						}
					})
			})	
	});

//Get amount  ==========================================================
	customer.get("/getamount",function(req,res){
		var token = req.cookies.jwt;
		var abc = jwt.decode(token, app.get('superSecret'));
		decoded = abc;
		console.log(decoded)
		User.findOne({_id: decoded._id},function(err,user){
			if(err && !user)
				console.log(err);
			else {
				res.json({amount: user.balance});
				console.log(user.balance);
			}
		})
	})

	customer.get("/myqrcodes", function(req,res){
		var token = req.cookies.jwt;
		var abc = jwt.decode(token, app.get('superSecret'));
		decoded = abc;
		QR.find({owner: decoded._id})
		  .populate('item', 'name')
		  .select("shortid item hmac")
		  .exec(function(err,codes){
		  	res.json({success: true, data: codes})
		  })
	})	

}