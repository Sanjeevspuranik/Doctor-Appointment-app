const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getSingleDcotorControllers,
  doctorAppointmentController,
  updateStatusController,
} = require("../controllers/doctorController");
const authMiddleware = require("../middlewares/authMiddleware");

const route = express.Router();

// POST SINGLE DOCTOR INFO
route.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// POST UPDATE DOCTOR INFO
route.post("/updateDoctorInfo", authMiddleware, updateProfileController);

// GET DOCTOR DETAILS
route.post("/getDoctorById", authMiddleware, getSingleDcotorControllers);

// DOCTOR CONTROLLER for getting appointments
route.get("/doctor-appointments", authMiddleware, doctorAppointmentController);

// UPDATE STATUS FOR USER
route.post("/update-status", authMiddleware, updateStatusController);

module.exports = route;
