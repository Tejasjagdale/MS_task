const mysql = require("mysql");

var connection = mysql.createPool({
  connectionLimit: 2,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  timezone: "utc",
});

// Flushing privileges in MySQL with two commands -
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass';
// flush privileges;

module.exports = connection;
