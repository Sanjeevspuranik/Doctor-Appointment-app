const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
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
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);

app.post("/api/v1/send-sms", async (req, res) => {
  const { to, body } = req.body;

  const result = await sendSMS(to, body);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
});

const port = process.env.PORT || 8080;

// Allow requests from localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));
//listen
app.listen(port, () => {
  console.log(`server is running as ${process.env.DEV_MODE} on port ${port} `);
});
