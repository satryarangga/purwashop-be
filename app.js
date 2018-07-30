var express = require('express');
var app = express();
var mongo = require('./config/mongodb');

var ProductController = require('./src/product/ProductController');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
  next();
});

app.use('/product', ProductController);

module.exports = app;