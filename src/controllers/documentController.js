const db = require("../config/db");

// ================= GET ALL + SEARCH =================
exports.getAll = async (req, res) => {
  try {
    console.log("🔥 HIT API /documents");

    const keyword = req.query.keyword;

    let sql = "SELECT * FROM documents";
    let params = [];

    if (keyword) {
      sql += " WHERE title LIKE ?";
      params.push(`%${keyword}%`);
    }

    const [rows] = await db.query(sql, params);

    res.json(rows);
  } catch (err) {
    console.error("❌ getAll ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ================= UPLOAD =================
exports.upload = async (req, res) => {
  try {
    console.log("🔥 HIT API /upload");

    const title = req.body.title || "no-title";

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = req.file.path; // Cloudinary trả link

    const sql = `
      INSERT INTO documents (title, file_url)
      VALUES (?, ?)
    `;

    await db.query(sql, [title, fileUrl]);

    res.json({ message: "Upload thành công", fileUrl });
  } catch (err) {
    console.error("❌ upload ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ================= DELETE =================
exports.remove = async (req, res) => {
  try {
    console.log("🔥 HIT API DELETE");

    const id = req.params.id;

    await db.query("DELETE FROM documents WHERE id = ?", [id]);

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("❌ delete ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};