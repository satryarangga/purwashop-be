var express = require('express');
var app = express();
var mongo = require('./config/mongodb');

var ProductController = require('./src/product/ProductController');
var CartController = require('./src/cart/CartController');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
  next();
});

app.use('/product', ProductController);
app.use('/cart', CartController);

module.exports = app;