const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./Routers/userRouters");

dotenv.config();
app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("HTTP Method-" + req.method + ", URL -" + req.url);
  next();
});

app.use("/api", userRoute);

main().catch((err) => console.log("main error", err));

async function main() {
  await mongoose
    .connect(process.env.URL_DataBas)
    .then((res) => console.log("mongoss is conect "))
    .catch((error) => console.log("mongoose cath error", error));
}

app.listen(process.env.port || 5000, () => {
  console.log("server is running on port 5000");
});

app.get("/", (req, res) => {
  res.send("server is running");
});
