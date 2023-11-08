const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");

//Register Handler
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(200).send({ success: false, message: "User already exist" });
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
        message: `register controller ${error.message}`,
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
        .status(200)
        .send({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .send({ success: false, message: "email ID or password wrong" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ success: true, message: "logged in successfully", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: `login controller ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userID });
    user.password = undefined;
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "user not found" });
    } else {
      return res.status(200).send({
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
    const seennotification = await userModel.seennotification;
    const notification = user.notification;
    user.seennotification.push(...notification);
    user.notification = notification;
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `error while getting notification ${error}`,
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
    res.status(200).send({
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

module.exports = {
  loginController,
  registerController,
  authController,
  applydoctorController,
  getallnotificationController,
  deleteNotificationController,
};
