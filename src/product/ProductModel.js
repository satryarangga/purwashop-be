const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	title: String,
	author: String,
	price: Number,
	stock: Number,
	image: String
});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;