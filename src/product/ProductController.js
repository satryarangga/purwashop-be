var express = require('express');
var router = express.Router();
var Product = require('./ProductModel');

router.get("/", function(request, response){
	Product.find((err, products) => {
		if(err) {
			res.status(400).send('No data found');
		}
		response.send(products);
	})
});


module.exports = router;

