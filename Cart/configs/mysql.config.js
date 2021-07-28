require('dotenv').config()

// Set up mysql /
var mysql = require('mysql2');

const mysqlConfig = {
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'root',
	database: process.env.MYSQL_DATABASE || 'everything',
    port: process.env.MYSQL_PORT || '3307'
}
var mysqlConnection = mysql.createConnection(mysqlConfig);

mysqlConnection.connect((err) => {
	if (err)
		throw err
	else
		console.log('connected to mysql')
});

var addTableSQL = 'CREATE TABLE IF NOT EXISTS carts( cart_id AUTO_INCREMENT PRIMARY KEY, product_id VARCHAR(200) NOT NULL  FOREIGN KEY, user_id VARCHAR(500) NOT NULL, quantity iNT NOT NULL, color, VARCHAR(100), NOT NULL, size VARCHAR(50) NOT NULL);'
mysqlConnection.query(addTableSQL, function (error, results, fields) {

    try {
        if (error)
            throw error
        console.log(results)

    } catch (error) {
        console.log(error)
        throw error
    }

})
module.exports = mysqlConnection