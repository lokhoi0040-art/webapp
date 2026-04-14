const mysql = require("mysql2/promise");

const db = mysql.createPool(process.env.MYSQL_URL);

console.log("✅ DB Pool created");

module.exports = db;