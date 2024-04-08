const express = require("express");
const register = require("../controler/registerControler");
const Login = require("../controler/loginControler");
const userRoute = express.Router();

userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));

userRoute.post("/register", register);
userRoute.post("/Login", Login);

module.exports = userRoute;
