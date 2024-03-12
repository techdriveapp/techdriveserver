const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userform = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Name: {
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
});

module.exports = mongoose.model("userform", userform);
