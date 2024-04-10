const MissingData = require("../modal/MissingData");
const mongoose = require("mongoose");

const addMissingData = async (req, res) => {
  try {
    console.log("req.body", req.body);
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
      imageone,
      imagetwo,
      prize,
    } = req.body;
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
      imageone,
      imagetwo,
      prize,
    });
    // await missingData.save();
    res.status(200).json(missingData);
  } catch (error) {
    console.error("Error:", error.message);
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
    console.error("Error1:", error.message);
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
};
