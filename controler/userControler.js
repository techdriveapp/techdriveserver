const userScima = require("../modal/userform");
const SECRET_KEY = "NODESAPI";
const byct = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    console.log("ok", req.body);
    const {
      username,
      number,
      email,
      password,
      Name,
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
    const userExgist = await userScima.findOne({ Email: email });
    if (userExgist) {
      return res.status(400).json({ message: "user already Exgist" });
    }

    const haspassword = await byct.hash(password, 10);

    const formuser = new userScima({
      username,
      number,
      email,
      password: haspassword,
      Name,
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
    await formuser.save();
    const token = jwt.sign(
      { Email: formuser.email, id: formuser._id },
      SECRET_KEY
    );

    res.status(200).json({
      message: ` User register successfully`,
      success: true,
      token,
      recruiterName: formuser.username,
      Email: formuser.email,
      id: formuser._id,
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
    const userExgist = await userScima.findOne({ Email: email });
    if (!userExgist) {
      return res.status(400).json({ message: "user not found" });
    }
    const matchpassword = await byct.compare(password, userExgist.password);
    if (!matchpassword) {
      return res.status(400).json({ message: "Invaled password" });
    }
    const token = jwt.sign(
      { Email: userExgist.email, id: userExgist._id },
      SECRET_KEY
    );
    res.status(200).json({
      message: ` Login Successful`,
      recruiterName: userExgist.Name,
      token: token,
    });
  } catch (error) {
    console.log("Login Error:", error.message);
    res
      .status(500)
      .json({ message: "Login internal server error", error: error.message });
  }
};

const userData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userScima.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, Login, userData };
