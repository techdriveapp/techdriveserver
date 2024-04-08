const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const Mongodb = require("./Config/Mongodb");
const userRoute = require("./Routers/userRouters");
const MissingdataRoute = require("./Routers/MissingRouter");

dotenv.config();
app.use(cors());
Mongodb();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("HTTP Method-" + req.method + ", URL -" + req.url);
  next();
});

app.use("/api", userRoute);
app.use("/api", MissingdataRoute);

app.listen(process.env.port || 5000, () => {
  console.log("server is running on port 5000");
});

app.get("/", (req, res) => {
  res.send("server is running");
});
