const express = require("express");
const Auth = require("../MiddleWare/Authentication");

const {
  addPaymentRecive,
  getPaymentRecive,
  upload,
} = require("../controler/paymentReciveControler");
const paymentReciveRoute = express.Router();

paymentReciveRoute.use(express.json());
paymentReciveRoute.use(express.urlencoded({ extended: true }));

paymentReciveRoute.post(
  "/createpayment",
  upload.fields([{ name: "image", maxCount: 1 }]),
  Auth,
  addPaymentRecive
);
paymentReciveRoute.get("/getdatapayment", Auth, getPaymentRecive);

module.exports = paymentReciveRoute;
