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

var addTableSQL = 'CREATE TABLE IF NOT EXISTS stores( store_id VARCHAR(500) PRIMARY KEY, name VARCHAR(200) NOT NULL, picture VARCHAR(500));'
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