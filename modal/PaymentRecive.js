const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentRecive = new Schema(
  {
    image: {
      type: String,
      //   validate: {
      //     validator: function (value) {
      //       return /\.(jpg|jpeg|png|gif|bmp)$/i.test(value);
      //     },
      //     message: (props) => `${props.value} is not a valid image format!`,
      //   },
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("paymentRecive", paymentRecive);
