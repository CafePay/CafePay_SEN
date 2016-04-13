//var router = require("./api");
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
var Feedback = require('./models/feedback');
var Complaint = require('./models/complaint');
var Transaction = require('./models/transaction');
var Transactionwr = require('./models/transactionwr');
var Recharge = require('./models/recharge');
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
var shortidOptions={
	length:10,
	number:true,
	symbols:false,
	uppercase: false
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
module.exports = function(app, passport) {

	app.use(cookieParser());
	function mid2(req,res,next){

	if(!(req.decoded.account == "vendor")){
		res.json({ success: false, err: "forbidden" }); 
	}
	else{
		next();
	}
}
	var router = express.Router();
	var customer = express.Router();
	var vendor = express.Router();
	var admin = express.Router();
	var committee = express.Router();

	app.use('/customer',customer);
	app.use('/vendor',vendor);
	app.use('/admin',admin);
	app.use('/committee',committee);
	vendor.use(mid)
	vendor.use('/profile',mid2)
	admin.use(mid);
	admin.use('/profile',mid4);
	committee.use(mid);
	committee.use('/profile',mid3)
	admin.use('/profile',mid4);
	customer.use(mid,mid1)
	app.use('/api',router);	
	//router.use('/',mid)
	require('./api')(app,router);
	require('./VendorRoutes')(app,vendor);
	require('./AdminRoutes')(app,admin);
	require('./CommitteeRoutes')(app,committee);
	
	//require('./VendorRoutes')(app,mid)
	app.get('/', function(req, res) {
		res.sendFile('/index.html'); 
	});

	
	app.get('/data',function(req,res){
	res.json(store);
})
	
function mid(req, res, next) {
	
	console.log("hi")
	if(req.path === '/login' || req.path === '/signup' || req.path === '/forgot'){
		next();

	}
	else{
  // check header or url parameters or post parameters for token
 // var token = req.body.token || req.query.token || req.headers['authentication'];

 	var rtoken = req.cookies.jwt;
 	console.log(rtoken)
  // decode token

  		Temptoken.findOne({token : rtoken},function(err,token){


			  		if (rtoken && token) {

				    // verifies secret and checks exp
				    jwt.verify(rtoken, app.get('superSecret'), function(err, decoded) {      
				      if (err) {
				      	console.log(err.message)
				        return res.json({ success: false, err : "notoken"});    
				      } else {
				        // if everything is good, save to request for use in other routes
				        console.log(decoded)
				        req.decoded = decoded; 


				       // console.dir(req.decoded)   
				        next();
				      }
				    });

				  } else {

				    // if there is no token
				    // return an error
				   
				    res.json({ success: false, err: "notoken" }); 
				  }

  		})



  //next();
}
}
function mid1(req,res,next){

	if(!(req.decoded.account == "customer")){
		res.json({ success: false, err: "forbidden" }); 
	}
	else{
		next();
	}
}

function mid3(req,res,next){

	if(!(req.decoded.account == "committee")){
		res.json({ success: false, err: "forbidden" }); 
	}
	else{
		next();
	}
}
function mid4(req,res,next){

	if(!(req.decoded.account == "admin")){
		res.json({ success: false, err: "forbidden" }); 
	}
	else{
		next();
	}
}



	app.post('/login',function(req,res){
			console.log(req.body.username)
		User.findOne(({username:req.body.username}),function(err,user){
			response = {};
			if(!user){
				response.success = false;
				response.err = 'nouser';
			}
			if( !response.err && /*(req.body.password != user.password)*/!user.validPassword(req.body.password)){
				response.success = false;
				response.err = 'nopassword';
			}
			else if(!response.err){
										

				var udata = {_id : user._id,
							 username : user.username,
							 email : user.email,
							 account : user.account};
				
				var token = jwt.sign(udata, app.get('superSecret'), {
				expiresIn: 3600 
				});


				var tmp = Temptoken({
					token : token,
					valid : true
				});
				tmp.save();
				response.success= true
					response.user = udata;
					//response.token= token
					res.cookie("jwt",token,{maxAge : 3600*1000,httpOnly: true});
			}
			//console.log(response)
		res.json(response)
				
	});

});
app.post('/signup',function(req,res){
	/*var x = parseInt(req.body.contactno)
	console.log(x)*/



	User.findOne({$or:[{email:req.body.email},{username:req.body.username}]},function(err,user){

		response={};

		if(user){
			//console.log("dfaddddddfsafeaffadfafsfdfasfsdfdsfsdfwrgah")
			response.success = false;

			if(user.email == req.body.email)
				response.err = "emailtaken";
			else
				response.err = "usernametaken"
		}
		else{
			var password = generator.generate(generatorOptions);
			console.log(User.generateHash(req.body.password))
			var user = new User({username:req.body.username,
								 email:req.body.email,
								 password: /*req.body.password*/User.generateHash(req.body.password),
								 account: req.body.account,
								 balance: 5000});
			user.save(function (err){
				if(err)
					console.log(err)
			});
			mailList ={};
			mailList.to = req.body.email;
			mailList.subject = "halo bhaii.. lejo";
			mailList.text = 'tamaro password is  "'+ password+'"';
			smtp.sendMail(mailList, function(error, response){
				if(error){
					console.log(error);
				}
				else{
					console.log("Message sent: " + response.message);

				}
			});
			response.success = true;
		}

		console.log(response)
		res.json(response)
	})

	/*User.findOne(({email:req.body.email}),function(err,user){
		 response = {};
		 check = false;
			if(user){
				console.log("hiiiiiiiiiiiiiiiiiii")
				response.err = "emailtaken";
				response.success = false;
			}
			else{
				


				console.log("first")
				User.findOne(({username:req.body.username}),function(err,user){

						if(user){

								response.err = "usernametaken"
								response.success = false
								console.log(response)
								
						}
						else{
							console.log("second")
							check = true;
								var user = new User({username:req.body.username,
								 email:req.body.email,
								 password: User.generateHash(req.body.password),
								 account: req.body.account});
								user.save(function (err){
									if(err)
										console.log(err)
								});

								response.success = true
								console.log(response)
						}
						console.log("err")
						console.log(response)
						res.json(response);
				})
			}
			console.log(check)
			if(!check){
				console.log("what ")
				console.log(response)
				res.json(response);
			}
	});*/
	
	
	
	/*console.dir(req.body)
	res.json(req.body);*/	
})


	
	

app.post('/forgot',function(req,res){


	User.findOne(({email:req.body.email}),function(err,user){
			response = {};
			if(err)
				console.log(err);

			else if(!user){
				response.success = false;
				response.err = "nouser"
			}
			else{
					var password = generator.generate(generatorOptions);
					mailList ={};
					mailList.to = user.email;
					mailList.subject = "halo bhaii.. lejo";
					mailList.text = 'tamaro password is:   '+ password;
					smtp.sendMail(mailList, function(error, response){
						if(error){
							console.log(error);
						}
						else{

							console.log("Message sent: " + response.message);
							user.password = User.generateHash(password);
							user.save(function(err){
								if(err)
									console.log(err)
							});
							
						}
					});
					response.success = true;


			}

			res.json(response);

	})


})
	












app.post('/logout',function(req,res){

	Temptoken.remove({token : req.cookies.jwt},function(err){
			if(!err)
				res.json({success : true})
	})
})

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



	customer.get('/getlogs',function(req,res){



	Transaction.find({customer : req.decoded._id})
			   .populate('item' , 'name price')
			   .populate('vendor' , 'username')
			   .exec(function(err,logs){


			   		if(logs)
			   			res.json({success : true , data : logs});
			   })





})



	customer.get('/profile', mid,mid1, function(req, res) {
			User.findOne({username : req.decoded.username})
				.exec(function(err,doc){
					res.json({success : true, username : req.decoded.username, balance : doc.balance});
				})
			
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
																														hmac : mac,
																														scanned : false

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
													
															res.json({ success : true,balance : user.balance})

														


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

customer.get('/getwrlogs',function(req,res){



	Transactionwr.find({owner : req.decoded.username})
			   
			   .exec(function(err,logs){


			   		if(logs)
			   			res.json({success : true , data : logs});
			   })





})
function isLoggedIn(req, res, next) {

	
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}














};
