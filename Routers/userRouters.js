const express = require("express");
const register = require("../Controler/registerControler.js");
const Login = require(".././Controler/loginControler.js");
const userRoute = express.Router();

userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));

userRoute.post("/register", register);
userRoute.post("/Login", Login);

module.exports = userRoute;
