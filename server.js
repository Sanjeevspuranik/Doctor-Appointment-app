const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

//rest object
const app = express();

//mongo connection
connectDB();

//middlewares
dotenv.config();
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", authRoutes);

const port = process.env.PORT || 8080;

// Allow requests from localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));
//listen
app.listen(port, () => {
  console.log(`server is running as ${process.env.DEV_MODE} on port ${port} `);
});
