const MissingData = require("../modal/MissingData");
const mongoose = require("mongoose");
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

const addMissingData = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.files);
  try {
    console.log("req.body", req.body);
    console.log("req.file", req.files);
    const {
      userId,
      name,
      age,
      address,
      hight,
      sex,
      holiya,
      date,
      time,
      place,
      others,
      prize,
      fathercontect,
      localstatiocontect,
    } = req.body;

    const localPath = req.files?.imageone[0].path;
    const localPathtwo = req.files?.imagetwo[0].path;
    console.log("localPath", localPath);
    const imageone = await uploadOnCloudinary(localPath);
    const imagetwo = await uploadOnCloudinary(localPathtwo);
    console.log("image", imageone, imagetwo);
    const missingData = await MissingData.create({
      userId: userId,
      name,
      age,
      address,
      hight,
      sex,
      holiya,
      date,
      time,
      place,
      others,
      imageone: imageone.url,
      imagetwo: imagetwo.url,
      prize,
      fathercontect,
      localstatiocontect,
    });
    console.log("missingData", missingData);
    // await missingData.save();
    res
      .status(200)
      .json({ message: "Data added successfully", missingData: missingData });
  } catch (error) {
    console.error("Error 2:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMissingData = async (req, res) => {
  try {
    const missingData = await MissingData.find();
    res.status(200).json(missingData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getMissingUserIdData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const missingData = await MissingData.find({ userId: userId });
    res.status(200).json(missingData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMissingData = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "ID parameter is missing" });
    }

    const id = req.params.id;
    console.log("req.params.id", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID parameter" });
    }

    const missingData = await MissingData.findByIdAndDelete(id);
    console.log("missingData", missingData);
    if (!missingData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(missingData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMissingData = async (req, res) => {
  try {
    const id = req.params.id;
    const missingData = await MissingData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(missingData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addMissingData,
  getMissingData,
  getMissingUserIdData,
  deleteMissingData,
  updateMissingData,
  upload,
};
