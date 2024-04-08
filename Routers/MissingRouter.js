const express = require("express");
const Auth = require("../MiddleWare/Authentication");
const {
  addMissingData,
  getMissingData,
  getMissingUserIdData,
} = require("../controler/MissingDataControler");
const missingRoute = express.Router();

missingRoute.use(express.json());
missingRoute.use(express.urlencoded({ extended: true }));

missingRoute.post("/create", Auth, addMissingData);
missingRoute.get("/getdata", Auth, getMissingData);

missingRoute.get("/getdata/:userId", getMissingUserIdData);

module.exports = missingRoute;
