const contectscima = require("../modal/contact");

const createContact = async (req, res) => {
  const { firstname, lastname, email, mobileNumber, message } = req.body;
  if (!firstname || !lastname || !email || !mobileNumber || !message) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }
  try {
    const newContact = new contectscima({
      firstname,
      lastname,
      email,
      mobileNumber,
      message,
    });
    await newContact.save();
    return res.status(200).json({
      status: "success",
      message: "Contact details saved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to save contact details" });
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await contectscima.find();
    return res.status(200).json({ status: "success", contact });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to get contact details" });
  }
};

module.exports = {
  createContact,
  getContact,
};
