const express = require("express");
const Auth = require("../MiddleWare/Authentication");
const locationRouter = express.Router();
const {
  addLocations,
  getLocations,
} = require("../controler/locationsControler");

locationRouter.use(express.json());
locationRouter.use(express.urlencoded({ extended: true }));

locationRouter.post("/addlocation",Auth, addLocations);
locationRouter.get("/getlocation",Auth, getLocations);

module.exports = locationRouter;
