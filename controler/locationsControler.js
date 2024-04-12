const locations = require("../modal/Location");

const addLocations = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { area, areaName, username, userId } = req.body;
    const newlocations = await locations.create({
      userId: userId,
      username,
      area,
      areaName,
    });
    console.log(newlocations);
    res.status(200).json(newlocations);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLocations = async (req, res) => {
  try {
    const location = await locations.find();
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { addLocations, getLocations };
