const db = require("../config/db");

// GET ALL
const getAllDocuments = async () => {
  const [rows] = await db.query("SELECT * FROM documents");
  return rows;
};

// CREATE
const createDocument = async (title, category, tags, file_path) => {
  const sql = `
    INSERT INTO documents (title, category, tags, file_path)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [title, category, tags, file_path]);
  return result.insertId;
};

// DELETE
const deleteDocument = async (id) => {
  await db.query("DELETE FROM documents WHERE id = ?", [id]);
};

// SEARCH
const searchDocuments = async (keyword) => {
  const sql = `
    SELECT * FROM documents
    WHERE title LIKE ?
  `;

  const [rows] = await db.query(sql, [`%${keyword}%`]);
  return rows;
};

module.exports = {
  getAllDocuments,
  createDocument,
  deleteDocument,
  searchDocuments
};