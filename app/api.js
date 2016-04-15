//Requiring dependencies ===============================================
var express 		= require('express');
var cookieParser 	= require('cookie-parser');

var Item 			= require('./models/item');

//Getting items from Item Schema ========================================
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