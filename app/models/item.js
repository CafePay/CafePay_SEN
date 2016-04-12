var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	name: String,
	price: Number,
	available_at: [Number]
});

module.exports = mongoose.model('Item', itemSchema);

