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
  },
  holiya: {
    type: String,
  },
  time: {
    type: String,
  },
  place: {
    type: String,
  },
  others: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  prize: {
    type: Number,
  },
 showAddArea: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("liveData", liveData);
