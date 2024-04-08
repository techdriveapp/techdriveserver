const jwt = require("jsonwebtoken");
const userform = require("../modal/userform");

const varifyToken = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      let token = await req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Access denied!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("decoded", decoded);
      const response = await userform.findById(decoded._id).select("-password");
      req.user = response;
      next();
    }
  } catch (error) {
    console.log("error1", error.message);
    res.status(401).json({ error: error.message });
  }
};

module.exports = varifyToken;
