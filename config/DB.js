const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();

//connection to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `server connected to MongDB ${mongoose.connection.host}`.bgGreen
    );
  } catch (error) {
    console.log(`MongoDB got error ${error}`.bgRed);
  }
};

module.exports = connectDB;
