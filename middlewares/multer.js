const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../services/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: "elicms",
      allowed_formats: ["webp", "jpg", "png", "mp4"],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
