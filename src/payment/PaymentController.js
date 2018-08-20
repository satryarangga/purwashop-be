var express = require('express');
var router = express.Router();
var Payment = require('./PaymentModel');

router.get('/', function(request, response) {
	Payment.find({}, (error, result) => {
		if(error) {
			response.status(500).send("Something Wrong")
			return
		}

		response.status(200).send(result);
	})
});

module.exports = router;