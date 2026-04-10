const express = require("express");
const router = express.Router();

const upload = require("../services/uploadService");

const {
  uploadDocument,
  getDocuments,
  searchDocuments,
  deleteDocument
} = require("../controllers/documentController");

//  upload
router.post("/upload", upload.single("file"), uploadDocument);

//  get all
router.get("/", getDocuments);

// 🔥 search
router.get("/search", searchDocuments);

//  delete
router.delete("/:id", deleteDocument);

module.exports = router;