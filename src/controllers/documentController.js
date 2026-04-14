const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM documents", (err, result) => {
    res.json(result);
  });
};

exports.upload = (req, res) => {
  const title = req.body.title;
  const fileUrl = req.file.path;

  const sql = "INSERT INTO documents (title, file_url) VALUES (?, ?)";

  db.query(sql, [title, fileUrl], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Upload thành công" });
  });
};

exports.remove = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM documents WHERE id=?", [id], () => {
    res.json({ message: "Deleted" });
  });
};