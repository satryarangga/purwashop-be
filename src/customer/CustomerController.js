var express = require('express');
var router = express.Router();
var Customer = require('./CustomerModel');
var bodyParser = require('body-parser');
var md5 = require('md5');

router.use( bodyParser.json() );     
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/register', function(request, response) {
	const { body } = request;
	var data = {
		name: body.name,
		email: body.email,
		password: md5(body.password),
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

router.post('/login', function(request, response) {
	const { body } = request;
	const hash = md5(body.password);
	Customer.find({email:body.email, password:hash}, (error, result) => {
		if(error) {
			response.status(500).send("Something wrong");
			return;
		}

		if(result.length == 0) {
			var error = {
				message: "Invalid username or password"
			}
			response.status(400).send(error);
			return;
		}

		response.status(200).send(result[0]);
	})
});

router.put('/update/:customerId', function(request, response) {
	const { body } = request;
	const { customerId } = request.params;

	Customer.findById(customerId, function(error, result) {
		if(error) {
			response.status(500).send(error);
			return;
		}

		result.name = body.name;
		result.email = body.email;
		result.address = body.address;
		result.phone = body.phone;

		result.save( function(error, updatedCustomer) {
			if(error) {
				response.status(500).send("Something wrong");
				return;
			}

			response.status(200).send(updatedCustomer);
		})
	})

});

module.exports = router;