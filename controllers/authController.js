const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");


//Register Handler
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(201).send({ success: false, message: "User already exist" });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    req.body.password = hashedpassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ success: true, message: "Registered successfully" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // Email already exists
      return res
        .status(400)
        .send({ success: false, message: "Email already registered" });
    } else {
      res.status(500).send({
        success: false,
        message: `register controller error: ${error.message}`,
      });
    }
  }
};

//login Handler
const loginController = async (req, res) => {
  try {
    console.log(req.body.email);
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(201)
        .send({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(201)
        .send({ success: false, message: "email ID or password wrong" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(201)
      .send({ success: true, message: "logged in successfully", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: `login controller ${error.message}` });
  }
};

// GET USER DATA WHO IS LOGGED IN 
const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userID });
    user.password = undefined;
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "user not found" });
    } else {
      return res.status(201).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: `auth controller ${error.message}` });
  }
};

const applydoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstname} ${newDoctor.lastname} has applied for doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstname + " " + newDoctor.lastname,
        onClickpath: "/admin/doctors",
      },
    });

    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: `error while applying for doctor ${error}`,
    });
  }
};

const getallnotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const notification = user.notification;

    if (!notification || notification.length === 0) {
      return res.status(201).send({
        success: true,
        message: "No notifications to mark as read",
      });
    }

    user.seennotification = user.seennotification.concat(notification);
    user.notification = [];
    const updateUser = await user.save();

    res.status(201).send({
      success: true,
      message: "All notifications marked as read",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error while getting notifications: ${error}`,
    });
  }
};

// delete notification
const deleteNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(201).send({
      success: true,
      message: "All notifications deleted successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    res.status(500).send({
      message: "Error deleting all notifications",
      success: false,
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctor = await doctorModel.find({ status: "approved" });
    res.status(201).send({
      success: true,
      message: "All doctors fetched successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting all doctors",
      error,
    });
  }
};

const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = await appointmentModel(req.body);
    await newAppointment.save();

    const user = await userModel.findOne({ _id: req.body.doctorInfo.userID });
    const notification = user.notification;
    notification.push({
      type: "new-appointment-request",
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onClickpath: "/user/appointments",
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: `Appointment booked successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error booking appointment ${error}`,
    });
  }
};

const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date).toISOString();
    const startTime = moment(req.body.time).subtract(1, "hours").toISOString();
    const endTime = moment(req.body.time).add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;

    const appointment = await appointmentModel.find({
      doctorId,
      date,
      time: { $gte: startTime, $lte: endTime },
    });
    if (appointment.length > 0) {
      return res.status(201).send({
        success: true,
        message: `Appointments not available at this time`,
      });
    } else {
      res.status(201).send({
        success: true,
        message: `Appointments available at the select time`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error checking availability ${error}`,
    });
  }
};

const getAppointmentsController = async (req, res) => {
  try {
    const appointment = await appointmentModel.find({
      userId: req.body.userID,
    });
    res.status(200).send({
      success: true,
      message: `Appointments got successfully`,
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error getting appointment detials ${error}`,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applydoctorController,
  getallnotificationController,
  deleteNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  getAppointmentsController,
};
