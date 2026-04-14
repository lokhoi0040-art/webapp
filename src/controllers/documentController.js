const db = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM documents");
    res.json(rows);
  } catch (err) {
    console.error("❌ getAll:", err);
    res.status(500).json(err);
  }
};

exports.upload = async (req, res) => {
  try {
    const title = req.body.title;
    const fileUrl = req.file?.path || "no-file";

    const sql = "INSERT INTO documents (title, file_url) VALUES (?, ?)";
    await db.query(sql, [title, fileUrl]);

    res.json({ message: "Upload thành công" });
  } catch (err) {
    console.error("❌ upload:", err);
    res.status(500).json(err);
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query("DELETE FROM documents WHERE id=?", [id]);

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("❌ delete:", err);
    res.status(500).json(err);
  }
};