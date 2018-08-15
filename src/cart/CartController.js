var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('../../config/mysql');
var ProductModel = require('../product/ProductModel');

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

		response.status(200).send(result);
	})
});

router.get('/:customerId', function(request, response) {
	const { customerId } = request.params;

	var sql = `select * from shopping_cart where customer_id = '${customerId}'`;

	mysql.query(sql, (error, result) => {
		if(error) {
			response.status(400).send("Something wrong")
			return
		}


		result.map( (value, index) => {
			ProductModel.findOne({_id:value.product_id}, (error, resultProduct) => {
				result[index].productName = resultProduct.title;
				result[index].productImage = resultProduct.image;

				if(result.length - 1 == index) {
					response.status(200).send(result);
				}

				
			})
		});
	});

	
})
router.delete('/:cartId', function(request, response) {
	const { cartId } = request.params;
	var sql = `delete from shopping_cart where id = '${cartId}'`;

	mysql.query(sql, (error, result) => {
		if(error) {
			response.status(400).send("Something wrong")
			return
		}
		response.status(200).send("sukses delete");
	})
});

module.exports = router;