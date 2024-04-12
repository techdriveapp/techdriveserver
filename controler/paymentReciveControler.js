const paymentRecive = require("../modal/PaymentRecive");
const mongoose = require("mongoose");
const multer = require("multer");
const { uploadOnCloudinary } = require("../Utils/Cloudinary");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination function called");
    return cb(null, "./Public/temp");
  },
  filename: function (req, file, cb) {
    console.log("Filename function called");
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const addPaymentRecive = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  try {
    console.log("req.body", req.body);
    console.log("req.file", req.files);

    const { username, userId } = req.body;
    const localPath = req.files?.image[0].path;
    console.log("localPath", localPath);
    const images = await uploadOnCloudinary(localPath);
    console.log("image", images);
    const newPaymentRecive = new paymentRecive({
      userId: userId,
      username,
      image: images.url,
    });
    await newPaymentRecive.save();
    return res.status(200).json(newPaymentRecive);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getPaymentRecive = async (req, res) => {
  try {
    const paymentRevives = await paymentRecive.find();
    res.status(200).json(paymentRevives);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addPaymentRecive,
  getPaymentRecive,
  upload,
};
