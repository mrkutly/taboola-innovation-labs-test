require("dotenv").config()
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env["CRAWLER_DB_HOST"],
    user: process.env["CRAWLER_DB_USERNAME"],
    password: process.env["CRAWLER_DB_PASSWORD"],
    port: process.env["CRAWLER_DB_PORT"],
    database: "crawler",
})

connection.connect();

module.exports = connection