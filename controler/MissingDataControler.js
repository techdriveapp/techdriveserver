const MissingData = require("../modal/MissingData");

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

module.exports = { addMissingData, getMissingData, getMissingUserIdData };
