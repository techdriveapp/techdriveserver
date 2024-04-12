const liveData = require("../modal/LiveData");
const mongoose = require("mongoose");
const multer = require("multer");
const { uploadOnCloudinary } = require("../Utils/Cloudinary");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const addLiveData = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.files);
  try {
    console.log("req.body", req.body);
    const { name, age, address, date, others, prize, showAddArea } = req.body;
    const localPath = req.files?.image[0].path;
    console.log("localPath", localPath);
    const image = await uploadOnCloudinary(localPath);
    console.log("image", image);
    const newliveData = await liveData.create({
      name,
      age,
      address,
      date,
      others,
      image: image.url,
      prize,
      showAddArea,
    });
    res.status(200).json(newliveData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLiveData = async (req, res) => {
  try {
    const liveDatas = await liveData.find();
    res.status(200).json(liveDatas);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteLiveData = async (req, res) => {
  try {
    const id = req.params.id;
    const liveData = await liveData.findByIdAndDelete(id);
    if (!liveData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(liveData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateLiveData = async (req, res) => {
  try {
    const id = req.params.id;
    const liveData = await liveData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(liveData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addLiveData,
  getLiveData,
  deleteLiveData,
  updateLiveData,
  upload,
};
