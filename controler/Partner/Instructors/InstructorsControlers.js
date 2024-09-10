const multer = require("multer");
const { uploadOnCloudinary } = require("../Utils/Cloudinary");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./Public/temp");
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });