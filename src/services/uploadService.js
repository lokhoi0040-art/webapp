const multer = require("multer");

let upload;

try {
  const { CloudinaryStorage } = require("multer-storage-cloudinary");
  const cloudinary = require("../config/cloudinary");

  if (
    !process.env.CLOUDINARY_NAME ||
    !process.env.CLOUDINARY_KEY ||
    !process.env.CLOUDINARY_SECRET
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

  // fallback không crash server
  const storage = multer.memoryStorage();
  upload = multer({ storage });
}

module.exports = upload;