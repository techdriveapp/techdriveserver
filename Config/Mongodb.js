const mongoose = require("mongoose");

const connectMongoDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.URL_DataBas}`);
    console.log(`DATABASE CONNECTED`);
  } catch (error) {
    console.log(`Error :${error.message}`);
  }
};

module.exports = connectMongoDb;
