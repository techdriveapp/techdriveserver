const UserMobileNumber = require("../../modal/User/UserMobileNumberModel");
const UserProfile = require("../../modal/User/UserProfile");
const byct = require("bcrypt");

// Function to send OTP to the mobile number
const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  try {
    // Send OTP using Twilio Verify API
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to verify OTP and save the mobile number to UserProfile
const verifyOtpAndSaveNumber = async (req, res) => {
  const { otp } = req.body;

  // Retrieve mobile number from session
  const mobile = req.session.mobile;

  if (!mobile) {
    return res
      .status(400)
      .json({ message: "Mobile number is not available in session." });
  }

  try {
    const userMobileNumber = await UserMobileNumber.findOne({
      mobileNumber: mobile,
    });

    if (!userMobileNumber) {
      return res.status(404).json({ message: "Mobile number not found" });
    }

    // Verify OTP using Twilio Verify API
    client.verify.v2
      .services("VAeb312e88b3eaa985858c117121d9ade2")
      .verificationChecks.create({ to: `+91${mobile}`, code: otp })
      .then(async (verification_check) => {
        if (verification_check.status !== "approved") {
          return res.status(400).json({ message: "Incorrect OTP" });
        }

        // OTP is correct, mark as verified
        userMobileNumber.verified = true;
        await userMobileNumber.save();

        // Check if the user profile exists
        let userProfile = await UserProfile.findOne({ mobileNumber: mobile });

        if (!userProfile) {
          // Redirect to profile creation if not exist
          return res
            .status(200)
            .json({ message: "OTP verified. Redirect to profile creation." });
        }

        // Clear the mobile number from session
        req.session.mobile = mobile;

        // Log the user in if profile exists
        res
          .status(200)
          .json({ message: "Login successful, redirect to homepage." });
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "Failed to verify OTP" });
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const userregister = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    console.log("req.body", req.body);
    // const mobile = req.session.mobile;
    const userExist = await UserProfile.findOne({ mobile: mobile });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "user already exgist go to login page" });
    }
    const haspassword = await byct.hash(password, 10);
    const newUser = new UserProfile({
      name,
      email,
      password: haspassword,
      mobile,
    });
    console.log("newUser", newUser);
    await newUser.save();
    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error " });
  }
};

const login = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await UserProfile.findOne({ mobile: mobile });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchPassword = await byct.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Skip password comparison if using OTP-based login
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { sendOtp, verifyOtpAndSaveNumber, userregister, login };
