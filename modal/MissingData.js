const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const missingData = new Schema(
  {
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
    fathercontect: {
      type: Number,
      required: true,
    },
    localstatiocontect: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("missingData", missingData);
