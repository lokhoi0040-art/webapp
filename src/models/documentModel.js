const db = require("../config/db");

// GET ALL
const getAllDocuments = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM documents", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// CREATE
const createDocument = (title, category, tags, file_path) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO documents (title, category, tags, file_path)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [title, category, tags, file_path], (err, result) => {
      if (err) reject(err);
      else resolve(result.insertId);
    });
  });
};

// DELETE
const deleteDocument = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM documents WHERE id = ?", [id], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// SEARCH
const searchDocuments = (keyword) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM documents
      WHERE title LIKE ?
    `;

    db.query(sql, [`%${keyword}%`], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = {
  getAllDocuments,
  createDocument,
  deleteDocument,
  searchDocuments
};