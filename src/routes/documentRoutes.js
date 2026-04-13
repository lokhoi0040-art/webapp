const express = require("express");
const router = express.Router();

const upload = require("../services/uploadService");

const {
    uploadDocument,
    getDocuments,
    searchDocuments,
    deleteDocument
} = require("../controllers/documentController");

// Upload
router.post("/upload", upload.single("file"), uploadDocument);

// Get all documents
router.get("/", getDocuments);

// Search
router.get("/search", searchDocuments);

// Delete
router.delete("/:id", deleteDocument);

module.exports = router;