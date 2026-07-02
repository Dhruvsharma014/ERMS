const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "";

    if (file.fieldname === "photo") {
      uploadPath = path.join(__dirname, "../uploads/photos");
    } else if (file.fieldname === "cv") {
      uploadPath = path.join(__dirname, "../uploads/cv");
    }

    createFolder(uploadPath);

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
   cb(
  null,
  file.fieldname +
    "-" +
    uniqueSuffix +
    path.extname(file.originalname)
);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "photo") {
    const allowedImages = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedImages.includes(file.mimetype)) {
      return cb(new Error("Photo must be JPG, JPEG or PNG"), false);
    }
  }

  if (file.fieldname === "cv") {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("CV must be PDF"), false);
    }
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
