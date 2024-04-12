const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const location = new Schema({
  area: {
    type: String,
    enum: ["city", "district", "state"],
    required: true,
  },
  areaName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("location", location);
