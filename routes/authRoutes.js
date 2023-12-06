const express = require("express");
const {
  registerController,
  loginController,
  authController,
  applydoctorController,
  getallnotificationController,
  deleteNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  getAppointmentsController,
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

// GET ALL DOCTORS INFO
route.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//Auth
route.post("/getUserData", authMiddleware, authController);

// BOOK APPOINTMENT
route.post("/book-appointment", authMiddleware, bookAppointmentController);

// BOOKING AVIALABILITY
route.post(
  "/check-availability",
  authMiddleware,
  bookingAvailabilityController
);

// GET APPOINTMENTS
route.get("/user-appointments", authMiddleware, getAppointmentsController);

module.exports = route;
