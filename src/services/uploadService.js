const multer = require("multer");

let upload;

try {
  const { CloudinaryStorage } = require("multer-storage-cloudinary");
  const cloudinary = require("../config/cloudinary");

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error("Missing Cloudinary ENV");
  }

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "documents",
      resource_type: "auto"
    }
  });

  upload = multer({ storage });

} catch (err) {
  console.error("❌ Cloudinary fallback:", err.message);

  const storage = multer.memoryStorage();
  upload = multer({ storage });
}

module.exports = upload;