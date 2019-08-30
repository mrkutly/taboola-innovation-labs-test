require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
	host: process.env['DB_HOST'],
	user: process.env['DB_USERNAME'],
	password: process.env['DB_PASSWORD'],
	port: process.env['DB_PORT'],
	database: 'trc',
});

connection.connect();
connection.query = util.promisify(connection.query).bind(connection);

module.exports = connection;
