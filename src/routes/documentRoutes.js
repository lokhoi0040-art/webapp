const express = require("express");
const router = express.Router();

const upload = require("../services/uploadService");
const controller = require("../controllers/documentController");

// GET ALL
router.get("/", controller.getDocuments);

// SEARCH (thêm luôn)
router.get("/search", controller.searchDocuments);

// UPLOAD (🔥 FIX CHÍNH Ở ĐÂY)
router.post("/upload", upload.single("file"), controller.createDocument);

// DELETE
router.delete("/:id", controller.deleteDocument);

module.exports = router;