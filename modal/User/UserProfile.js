const mongoose = require("mongoose");
const UserMobileNumber = require("./UserMobileNumberModel");
const Schema = mongoose.Schema;

const userprofile = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false, // Optional field
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userprofile", userprofile);
