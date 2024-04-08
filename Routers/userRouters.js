const express = require("express");
const register = require("../controler/registercontroler");
const Login = require("../controler/logincontroler");
const userRoute = express.Router();

userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));

userRoute.post("/register", register);
userRoute.post("/Login", Login);

module.exports = userRoute;
