require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
	host: process.env['CRAWLER_DB_HOST'],
	user: process.env['CRAWLER_DB_USERNAME'],
	password: process.env['CRAWLER_DB_PASSWORD'],
	port: process.env['CRAWLER_DB_PORT'],
	database: 'crawler',
});

connection.connect();
connection.query = util.promisify(connection.query).bind(connection);

module.exports = connection;
