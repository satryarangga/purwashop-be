var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Payment = require('./PaymentModel');
var moment = require('moment');
var mysql = require('../../config/mysql');

router.use( bodyParser.json() );     
router.use(bodyParser.urlencoded({
  extended: true
})); 

router.get('/', function(request, response) {
	Payment.find({}, (error, result) => {
		if(error) {
			response.status(500).send("Something Wrong")
			return
		}

		response.status(200).send(result);
	})
});

router.post('/finish', function(request, response) {
	const { body } = request;
	const { customer_id, payment_method_id } = body;

	const dataOrderHead = {
		customer_id,
		payment_method_id,
		order_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
		total_purchase: 0
	}

	const sqlInsertHead = `insert into order_head set ?`;
	mysql.query(sqlInsertHead, dataOrderHead, (error, resultInsertHead) => {
		if(error) {
			response.status(500).send(error);
			return;
		}

		const sqlSelectCart = `select * from shopping_cart where customer_id = '${customer_id}'`;
		mysql.query(sqlSelectCart, (error, resultSelectCart) => {
			if(error) {
				response.status(500).send(error);
				return;
			}

			let grandTotal = 0;
			resultSelectCart.map((value, key) => {
				let dataOrderDetail = {
					order_id: resultInsertHead.insertId,
					product_id: value.product_id,
					customer_id,
					qty:value.qty,
					price:value.price,
					subtotal:value.subtotal
				}

				const sqlInsertDetail = `insert into order_detail set ?`;
				mysql.query(sqlInsertDetail, dataOrderDetail, (error, resultInsertDetail) => {
					if(error) {
						response.status(500).send(error);
						return;
					}
				})

				grandTotal += value.subtotal;
			});

			const sqlUpdateTotalPurchase = `update order_head set total_purchase = ${grandTotal} where id = ${resultInsertHead.insertId}`;

			mysql.query(sqlUpdateTotalPurchase, (error, resultUpdate) => {
				if(error) {
					response.status(500).send(error);
					return;
				}

				const sqlDeleteCart = `delete from shopping_cart where customer_id = '${customer_id}'`;

				mysql.query(sqlDeleteCart, (error, resultDeleteCart) => {
					if(error) {
						response.status(500).send(error);
						return;
					}					
				})
			});

			response.status(200).send(resultInsertHead);
		})
	})

})

router.get('/history/:customerId', function(request, response) {
	const { customerId } = request.params;

	const sqlHead = `select * from order_head where customer_id = '${customerId}'`;

	mysql.query(sqlHead, (error, result) => {
		if(error) {
			response.status(500).send(error);
			return;
		}

		result.map((value, key) => {
			console.log(value.id);
			let sqlDetail = `select * from order_detail where order_id = ${value.id}`;

			mysql.query(sqlDetail, (error, resultDetail) => {
				if(error) {
					response.status(500).send(error);
					return;
				}

				result[key].detail = resultDetail;	

				if(key == result.length - 1) {
					response.status(200).send(result);
				}
			});
			
		})
	})
})

module.exports = router;