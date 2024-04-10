const express = require("express");
const Auth = require("../MiddleWare/Authentication");
const {
  addMissingData,
  getMissingData,
  getMissingUserIdData,
  deleteMissingData,
  updateMissingData,
} = require("../controler/MissingDataControler");
const missingRoute = express.Router();

missingRoute.use(express.json());
missingRoute.use(express.urlencoded({ extended: true }));

missingRoute.post("/create", Auth, addMissingData);
missingRoute.get("/getdata", getMissingData);
missingRoute.delete("/delete/:id", Auth, deleteMissingData);
missingRoute.put("/update/:id", Auth, updateMissingData);

missingRoute.get("/getdata/:userId", Auth, getMissingUserIdData);

module.exports = missingRoute;
