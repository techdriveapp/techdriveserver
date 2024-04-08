const express = require("express");
const register = require("../Controler/registerControler");
const Login = require("../Controler/loginControler");
const userRoute = express.Router();

userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));

userRoute.post("/register", register);
userRoute.post("/Login", Login);
// userRoute.get("/user/:userId", userData);

module.exports = userRoute;
