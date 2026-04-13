const mysql = require("mysql2");

console.log("🔥 DB FILE ĐANG CHẠY");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "document_management", 
  port: 3307
});

db.connect(err => {
  if (err) {
    console.error("Lỗi kết nối DB:", err);
  } else {
    console.log("Kết nối MySQL thành công");
  }
});

module.exports = db;