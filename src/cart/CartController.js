var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('../../config/mysql');

router.use( bodyParser.json() );     
router.use(bodyParser.urlencoded({
  extended: true
})); 

router.post('/', function(request, response) {
	const { body } = request;
	var data = {
		customer_id: body.customer_id,
		product_id: body.product_id,
		price: body.price,
		qty: body.qty,
		subtotal: body.subtotal
	}

	var sql = "insert into shopping_cart set ?";

	mysql.query(sql, data, (error, result) => {
		if(error) {
			response.status(400).send("Something wrong")
			return
		}

		response.status(200).send(data);
	})
});

module.exports = router;