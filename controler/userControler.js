const userScima = require("../modal/userform");
const SECRET_KEY = "NODESAPI";
const byct = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
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
    const token = jwt.sign(
      { Email: newUser.email, id: newUser._id },
      SECRET_KEY
    );

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
    res.status(500).json(" register:-internal server error", error);
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const userExgist = await userScima.findOne({ email: email });
    if (!userExgist) {
      return res.status(400).json({ message: "user not found" });
    }
    const matchPassword = await byct.compare(password, userExgist.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { Email: userExgist.email, id: userExgist._id },
      SECRET_KEY
    );
    res.status(200).json({
      message: ` Login Successful`,
      username: userExgist.Name,
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

module.exports = { register, Login };
