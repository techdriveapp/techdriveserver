const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const liveData = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  hight: {
    type: Number,
    required: true,
  },
  holiya: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  others: {
    type: String,
    required: true,
  },
  imageone: {
    type: String,
    required: true,
  },
  imagetwo: {
    type: String,
    required: true,
  },
  prize: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("liveData", liveData);
