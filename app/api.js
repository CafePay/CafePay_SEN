var express = require('express')
var crypto = require('crypto');
var toString = require('json-string');
var shortid = require('shortid');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
var User = require('./models/user');
var Item = require('./models/item');
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
var smtp = nodemailer.createTransport("	SMTP", {
	service: "Gmail",
	auth: {
		user: "kirankatariya8778@gmail.com",
		pass: "kirudemon"
	}
});

module.exports = function(app,router) {


router.get('/itemlist',function(req,res){
	

			

			var query = Item.find({});
			query.exec(function(err, items){
				response = {};
				if(err){
					response.success = false;
				response.err = "nodata";
				}else{
				response.success = true;;
				response.items = items;

				}
				//If no errors, send them back to the client
				res.json(response);
		
			});


			

	
	});
};