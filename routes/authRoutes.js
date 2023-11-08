const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  authController,
  applydoctorController,
  getallnotificationController,
  deleteNotificationController,
} = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

const route = express.Router();

//Register
route.post("/register", registerController);

//Login
route.post("/login", loginController);

//Apply-doctor
route.post("/apply-doctor", authMiddleware, applydoctorController);

//notification
route.post(
  "/get-all-notification",
  authMiddleware,
  getallnotificationController
);

route.post(
  "/delete-all-notification",
  authMiddleware,
  deleteNotificationController
);

//Auth
route.post("/getUserData", authMiddleware, authController);

module.exports = route;
