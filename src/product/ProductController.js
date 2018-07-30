var express = require('express');
var router = express.Router();
var Product = require('./ProductModel');

router.get("/", function(request, response) {
	Product.find((err, products) => {
		if(err) {
			res.status(400).send('No data found');
		}
		response.send(products);
	})
});

router.get("/:author/:title", function(request, response) {
	const author = decodeURIComponent(request.params.author);
	const title = decodeURIComponent(request.params.title);

	Product.find({author, title},(err, products) => {
		if(err) {
			res.status(400).send('No data found');
		}
		response.send(products[0]);
	})
});

module.exports = router;

