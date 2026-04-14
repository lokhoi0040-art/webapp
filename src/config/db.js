const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "appuser",
  password: process.env.MYSQLPASSWORD || "123456",
  database: process.env.MYSQLDATABASE || "document_management",
  port: process.env.MYSQLPORT || 3307
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("DB OK");
});

module.exports = db;