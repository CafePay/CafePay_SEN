var express 		= require('express');
var crypto 			= require('crypto');
var toString 		= require('json-string');
var shortid 		= require('shortid');
var jwt 			= require('jsonwebtoken');
var cookieParser 	= require('cookie-parser');
var nodemailer 		= require("nodemailer");
var generator 		= require("generate-password");

var User 			= require('./models/user');
var Item 			= require('./models/item');

var generatorOptions = {
		length: 8,
		number: true,
		symbols: false,
		uppercase: true
}

module.exports = function(app,router) {

	router.get('/itemlist',function(req,res){
		var query = Item.find({})
		query.exec(function(err, items){
			response = {};
				if(err){
					response.success = false;
					response.err = "nodata";
				}
				else{
					response.success = true;
					response.items = items;
				}
			res.json(response);
		})
	})
}