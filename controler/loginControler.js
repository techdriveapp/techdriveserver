const userScima = require("../modal/userform");
const byct = require("bcrypt");
const generateJwtToken = require("../Config/GenerateJwtToken");

module.exports = Login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const userExgist = await userScima.findOne({ email: email });
    console.log("userExgist:", userExgist);
    if (!userExgist) {
      return res.status(400).json({ message: "user not found" });
    }
    const matchPassword = await byct.compare(password, userExgist.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = await generateJwtToken({
      Email: userExgist.email,
      id: userExgist._id,
    });
    console.log("User name:", userExgist.username);
    res.status(200).json({
      message: ` Login Successful`,
      username: userExgist.username,
      token: token,
      userId: userExgist._id,
    });
  } catch (error) {
    console.log("Login Error:", error.message);
    res
      .status(500)
      .json({ message: "Login internal server error", error: error.message });
  }
};
