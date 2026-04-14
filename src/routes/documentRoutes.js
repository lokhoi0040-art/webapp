const express = require("express");
const router = express.Router();

const controller = require("../controllers/documentController");
const upload = require("../services/uploadService");

router.get("/", controller.getAll);
router.post("/upload", upload.single("file"), controller.upload);
router.delete("/:id", controller.remove);

module.exports = router;