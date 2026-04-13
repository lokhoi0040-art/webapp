const documentModel = require("../models/documentModel");

// ==========================
// GET ALL
// ==========================
const getDocuments = async (req, res) => {
  try {
    const docs = await documentModel.getAllDocuments();

    // ✅ luôn trả array
    res.json(docs || []);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ==========================
// GET BY ID
// ==========================
const getDocument = async (req, res) => {
  try {
    const doc = await documentModel.getDocumentById(req.params.id);

    if (!doc) {
      return res.status(404).json({ message: "Không tìm thấy tài liệu" });
    }

    res.json(doc);
  } catch (err) {
    console.error("GET BY ID ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ==========================
// CREATE (UPLOAD FILE)
// ==========================
const createDocument = async (req, res) => {
  try {
    const { title, category, tags } = req.body;

    // ❗ check file
    if (!req.file) {
      return res.status(400).json({ error: "Chưa chọn file!" });
    }

    // lấy tên file
    const file_path = req.file.filename;

    const id = await documentModel.createDocument(
      title,
      category,
      tags,
      file_path
    );

    res.json({
      message: "Upload thành công",
      id: id
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ==========================
// UPDATE
// ==========================
const updateDocument = async (req, res) => {
  try {
    const { title, category, tags } = req.body;

    await documentModel.updateDocument(
      req.params.id,
      title,
      category,
      tags
    );

    res.json({ message: "Cập nhật thành công" });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ==========================
// DELETE
// ==========================
const deleteDocument = async (req, res) => {
  try {
    await documentModel.deleteDocument(req.params.id);

    res.json({ message: "Xóa thành công" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ==========================
// SEARCH
// ==========================
const searchDocuments = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const docs = await documentModel.searchDocuments(keyword);

    res.json(docs || []);
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ==========================
// EXPORT
// ==========================
module.exports = {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  searchDocuments
};