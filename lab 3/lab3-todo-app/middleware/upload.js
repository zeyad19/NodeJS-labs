// middleware/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // المسار اللي هيتخزن فيه الصور
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix); // اسم الصورة بعد الحفظ
  }
});

const upload = multer({ storage: storage });
module.exports = upload;
