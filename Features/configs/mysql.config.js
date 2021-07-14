require('dotenv').config()

// Set up mysql /
var mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MY_SQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});
mysqlConnection.connect((err) => {
	if (err)
		console.log(err)
	console.log('connected to mysql')
});

module.exports = mysqlConnection