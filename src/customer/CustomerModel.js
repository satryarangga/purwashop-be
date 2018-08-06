const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
	name: String,
	email: String,
	password: String,
	address: String,
	phone: String
});

const Customer = mongoose.model('customers', CustomerSchema);

module.exports = Customer;