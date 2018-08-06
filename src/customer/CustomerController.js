var express = require('express');
var router = express.Router();
var Customer = require('./CustomerModel');
var bodyParser = require('body-parser');

router.use( bodyParser.json() );     
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/register', function(request, response) {
	const { body } = request;
	var data = {
		name: body.name,
		email: body.email,
		password: body.password,
		address: body.address,
		phone: body.phone
	}

	Customer.find({email:data.email}, (error, result) => {
		if(error) {
			response.status(500).send("Something wrong");
			return;
		}

		if(result.length > 0) { // EMAIL EXISTED
			var error = {
				message:"This email is already registered"
			}
			response.status(400).send(error);
			return;	
		}

		new Customer(data).save()
		.then(newCustomer => {
			response.status(200).send(newCustomer);
		})
	});
});

module.exports = router;