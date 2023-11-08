const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//connection to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`server connected to MongDB ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`MongoDB got error ${error}`);
  }
};

module.exports = connectDB;
