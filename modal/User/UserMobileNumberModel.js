const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserMobileNumberSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false, // Optional field
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
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

const UserMobileNumberModel = mongoose.model(
  "UserMobileNumber",
  UserMobileNumberSchema,
  "usermobilenumbers"
);

// Create a new non-unique index on userId if it doesn't already exist
UserMobileNumberModel.collection.createIndex(
  { userId: 1 },
  { unique: false },
  function (err, result) {
    if (err) {
      console.error("Error creating index:", err);
    } else {
      console.log("Created new index:", result);
    }
  }
);

module.exports = UserMobileNumberModel;
