const userScima = require("../modal/userform");
const byct = require("bcrypt");
const generateJwtToken = require("../Config/GenerateJwtToken");

module.exports = register = async (req, res) => {
  try {
    console.log("ok", req.body);
    const { username, number, email, password } = req.body;
    const userExist = await userScima.findOne({ email: email });
    console.log("User from DB:", userExist);
    if (userExist) {
      return res.status(400).json({ message: "user already Exgist" });
    }

    const haspassword = await byct.hash(password, 10);

    const newUser = new userScima({
      username,
      number,
      email,
      password: haspassword,
    });
    await newUser.save();
    const token = await generateJwtToken({
      Email: newUser.email,
      id: newUser._id,
    });

    res.status(200).json({
      message: ` User register successfully`,
      success: true,
      token,
      username: newUser.username,
      Email: newUser.email,
      userId: newUser._id,
    });
  } catch (error) {
    console.log("Error:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
