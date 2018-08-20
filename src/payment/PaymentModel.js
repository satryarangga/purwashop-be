const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
	name: String,
	description: String,
	logo: String
});

const Payment = mongoose.model('payment_methods', PaymentSchema);

module.exports = Payment;