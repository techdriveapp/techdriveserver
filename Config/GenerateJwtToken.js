const jwt = require("jsonwebtoken");

const generateJwtToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
  });
  return token;
};

module.exports = generateJwtToken;
