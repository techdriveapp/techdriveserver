const express = require("express");
const Auth = require("../MiddleWare/Authentication");
const {
  addLiveData,
  getLiveData,
  deleteLiveData,
  updateLiveData,
} = require("../controler/liveControler");
const liveRoute = express.Router();

liveRoute.use(express.json());
liveRoute.use(express.urlencoded({ extended: true }));

liveRoute.post("/create", Auth, addLiveData);
liveRoute.get("/getdata", getLiveData);
liveRoute.delete("/delete/:id", Auth, deleteLiveData);
liveRoute.put("/update/:id", Auth, updateLiveData);
