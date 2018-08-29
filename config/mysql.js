const mysql = require('mysql');

const db = mysql.createConnection({
	host: '128.199.184.164',
	user: 'purwa',
	password: '123456',
	database: 'purwashop'
});

db.connect();

module.exports = db;