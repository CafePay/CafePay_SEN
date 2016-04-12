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






module.exports = function(app, customer){
	app.use(cookieParser());

	customer.post('/sendfeedback',function(req,res){

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

					var feed = Feedback({
						subject : req.body.subject,
						feedback : req.body.feedback,
						owner : decoded._id
					})
					feed.save(function(err){
						if(err){
							console.log(err);
						}else{
							res.json({success : true});
						}
					});

				}
			})

})


customer.post('/sendcomplaint',function(req,res){

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



customer.post('/requestrecharge',function(req,res){

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
					console.log(req.body.recharge)
					var  recha= Recharge({
						amount : req.body.recharge,
						OTP : otp,
						owner : decoded._id
					})



					recha.save(function(err){
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
























	customer.post('/changepassword',function(req,res){
			console.log(req.body)
			var abc = jwt.decode(req.cookies.jwt, app.get('superSecret'));
			decoded = abc;
			console.log(decoded);
			console.log(User.generateHash(req.body.oldpassword));
			User.findOne({_id : decoded._id /*password : /*req.body.oldpassword User.generateHash(req.body.oldpassword)*/},function(err,user){
				if(err || !user){
					console.log(err)
					console.log("hi")
					res.json({success : false});
				}
				else if((req.body.newpassword != req.body.confirmpassword)
						 ||(user.validPassword(req.body.newpassword))
						 || (!user.validPassword(req.body.oldpassword))){
						console.log("hi2")
						res.json({success : false})
				}
				else{

					user.password = /*req.body.newpassword*/User.generateHash(req.body.newpassword);
					user.save(function(err){
						if(err){
							console.log(err);
						}else{
							res.json({success : true});
						}
					});

				}
			})

})



	customer.get('/profile', function(req, res) {
			res.json({success : true});
	});

	
	/*app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});*/



	customer.post('/generate-qr-code', function(req, res){



																											function create(token,data,callback){


																													
																													//console.log(token)
																													var abc = jwt.decode(token, app.get('superSecret'));
																													decoded = abc;
																													var sid= generator.generate(shortidOptions);
																													gentime = new Date().toString()
																													//console.log(new Date(gentime))
																													//gentime.setTimezone('UTC+05:30')
																													crypt = {};

																															crypt.item = data;
																															crypt.shortid = sid;
																															console.log(crypt)
																															crypt.owner = decoded.username;
																															crypt.ctime = gentime;
																															var key = config.qrsecret;
																																//ta.shortid = sid;
																																//ta.owner  = decoded.username;
																															var text = JSON.stringify(crypt);
																															//console.log(data)
																															//console.log(text)
																															var mac = crypto.createHmac('sha256', key).update(text).digest('hex');
																															//console.log(hmac)
																													var code = new QR({
																														shortid : sid,
																														owner : decoded._id,
																														item: data._id,
																														ctime: gentime,
																														hmac : mac

																													});
																													
																													
																													code.save(function(err){

																														// return hi();
																														if(err){
																															console.log(err)
																															//return 0;
																															callback(0);
																														}
																														else{
																															/* crypt = {};

																															crypt.item = data;
																															crypt.shortid = sid;
																															console.log(crypt)
																															crypt.owner = decoded.username;
																															crypt.ctime = gentime;
																															var key = config.qrsecret;
																																//ta.shortid = sid;
																																//ta.owner  = decoded.username;
																															var text = JSON.stringify(crypt);
																															//console.log(data)
																															//console.log(text)
																															var hmac = crypto.createHmac('sha256', key).update(text).digest('hex');
																															//console.log(hmac)*/
																															console.log("jay 6")
																															// return 1;
																															/*tmp = {};
																															tmp.shortid = sid;
																															tmp.hmac = hmac;

																															idata.push(tmp);*/
																															callback(1);

																														}
																													});
																													
																																							/*	function promise(){
																																									var deferred  = q.defer();

																																									setTimeout(function(){

																																										code.save(function(err){
																																											if(!err)
																																												return deferred.resolve();
																																										})
																																										
																																											
																																									},0);

																																									return deferred.promise;
																																								};
																													 var tmp = promise().then(function(){
																															crypt = {};
																															crypt.item = data;
																															crypt.shortid = sid;
																															crypt.owner = decoded.username;
																															crypt.ctime = gentime;
																															var key = config.qrsecret;
																																//ta.shortid = sid;
																																//ta.owner  = decoded.username;
																															var text = JSON.stringify(crypt);
																															//console.log(data)
																															//console.log(text)
																															var hmac = crypto.createHmac('sha256', key).update(text).digest('hex');
																															//console.log(hmac)
																															return 1;
																													})

																													 return tmp;*/


																													


																											}




	
		reqdata = req.body
		//console.log(reqdata)
		arr = [];
		qsum = 0;


		//console.log(arr)
		for (var i=0;i<reqdata.length;i++){
			//console.log(reqdata[i]._id)
			arr.push(reqdata[i]._id)
			qsum = qsum + reqdata[i].quantity;
			//console.log(qsum)
		}
		//console.log(arr)

		Item.find({ _id : { $in : arr}},function(err,items){
			console.log("hi")
			if(err){
				console.log(err)
				res.json({success : false})
			}
			var counter = 0;
			var totalamount = 0;
			//console.log(reqdata)

			function callback(generated){
				counter = counter + generated;
				console.log("generated "+ generated)
				console.log("countr " + counter)
				if (generated == 0){
					//err
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

				User.findOne({_id : decoded._id},function(err,user){



							console.log("hmm"+ totalamount + " " + counter)
							if(user.balance < totalamount){

								console.log("err")
							}else{

















											/*reqdata.filter(function(data){

											for(var i=0;i<items.length;i++){

												if(items[i]._id == data._id){

													for(var j=0;j< data.quantity;j++){
														//create(item);
														token = req.cookies.jwt;
														/*generated = create(token,items[i],callback);//
														/*counter = counter + generated;
														console.log("generated "+ generated)
														console.log("countr " + counter)
														if (generated == 0){
															//err
															console.log("couldn't generated")
														}//
													}

													
												}
											}




										})*/
									//var idata = [];

													function promise(){
														var deferred  = q.defer();


																reqdata.filter(function(data){

																for(var i=0;i<items.length;i++){

																	if(items[i]._id == data._id){

																		for(var j=0;j< data.quantity;j++){
																			//create(item);
																			token = req.cookies.jwt;
																			/*generated = */create(token,items[i],callback);
																			/*counter = counter + generated;
																			console.log("generated "+ generated)
																			console.log("countr " + counter)
																			if (generated == 0){
																				//err
																				console.log("couldn't generated")
																			}*/
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
														},500);

														return deferred.promise;
													};

													promise().then(function(){

														
															//console.log("helloo")
															//console.log(totalamount)
															//console.log(user.balance)
															console.log("ohh")
															user.balance = user.balance - totalamount;
															console.log(totalamount)
															user.save()
															console.log(user.balance)
															//console.log(user.balance)
													
															res.json({ success : true,amount : user.balance})

														


													},function(){
														console.log("reject")
													})


								}

















				})




			//console.log(items)
		})	
	
		//console.log(req.body)
		/*var token = req.headers['x-access-token'];

		if(token){
			
			var decoded = jwt.decode(token, app.get('superSecret'));
			shortid = shortid.generate();
			console.log(decoded.username);
			var qrdata = {
				item: req.body.item,
				amount: req.body.amount,
				id: shortid,
				owner: decoded.username
			}

			var key = '#1337$72896435!incredibleIndia&IamSiddharthBro%'
			var text = toString(qrdata);
			var hmac = crypto.createHmac('sha256', key).update(text).digest('hex');	
			res.json(qrdata);
			console.log(hmac);
		}
*/
		/*var imgBuf = qrImage.imageSync(hmac, {type: 'png'});

		var jimp = require('jimp');

		jimp.read(imgBuf, function(err, image){

			image.resize(200, 200, function(err, image){

				jimp.read("./ticket.png", function(err, ticket_image){
					ticket_image.composite(image, 335, 40, function(err, ticket_image){
						ticket_image.write("./gen-ticket.png", function(err){
							console.log("Composed successfully.");
						});
					});
				});
			});
			
		});*/

		//res.json({success: true, message: 'Your QR code is successfully generated.'});

});

/*app.get("/test",function(req,res){


	QR.find({ _id : '5707c25000204e7e265d5cfb'})
	  .populate('owner item')
	  .exec(function(err,doc){
	  	res.json(doc);
	  })

})*/
customer.get("/getamount",function(req,res){

		var token = req.cookies.jwt;
		var abc = jwt.decode(token, app.get('superSecret'));
		decoded = abc;
		console.log(decoded)
		User.findOne({_id : decoded._id},function(err,user){

			if(err && !user)
				console.log(err);
			else {
				res.json({amount : user.balance});
				console.log(user.balance);
			}
		})

})


customer.get("/myqrcodes", function(req,res){

	var token = req.cookies.jwt;
	var abc = jwt.decode(token, app.get('superSecret'));
	decoded = abc;

	QR.find({owner : decoded._id})
	  .populate('item', 'name')
	  .select("shortid item hmac")
	  .exec(function(err,codes){

	  	//console.log(codes)
	  	res.json({success : true, data : codes})
	  })
})

	
}