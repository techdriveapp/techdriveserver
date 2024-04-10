const liveData = require("../modal/LiveData");

const addLiveData = async (req, res) => {
  try{
    console.log("req.body", req.body);
    const {
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
    const newliveData = await liveData.create({
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
    res.status(200).json(newliveData);
  }catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLiveData = async (req, res) => {
 try{
  const liveData = await liveData.find();
  res.status(200).json(liveData);
 }catch (error){
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
}
module.exports = {
  addLiveData,
  getLiveData,
  deleteLiveData,
  updateLiveData,
};
