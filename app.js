var express = require('express');
var app = express();
var mongo = require('./config/mongodb');

var ProductController = require('./src/product/ProductController');
var CartController = require('./src/cart/CartController');
var CustomerController = require('./src/customer/CustomerController');
var PaymentController = require('./src/payment/PaymentController');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
  next();
});

app.use('/product', ProductController);
app.use('/cart', CartController);
app.use('/customer', CustomerController);
app.use('/payment', PaymentController);

module.exports = app;