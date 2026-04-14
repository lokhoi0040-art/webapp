const multer = require("multer");

let upload;

try {
  const { CloudinaryStorage } = require("multer-storage-cloudinary");
  const cloudinary = require("../config/cloudinary");

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "documents",
      resource_type: "auto"
    }
  });

  upload = multer({ storage });

} catch (err) {
  console.error("❌ Cloudinary init failed:", err);

  // fallback (để app không crash)
  const storage = multer.memoryStorage();
  upload = multer({ storage });
}

module.exports = upload;