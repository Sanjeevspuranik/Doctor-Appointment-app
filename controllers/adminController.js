const { response } = require("express");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const getAllUsersControllers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(201).send({
      success: true,
      message: "Users data",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};

const getAllDoctorsControllers = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(201).send({
      success: true,
      message: "doctor data fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching doctors",
      error,
    });
  }
};

const ChangeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, {
      $set: { status },
    });
    const user = await userModel.findOne({ _id: doctor.userID });
    const notification = await user.notification;
    notification.push({
      type: "doctor-account-request-update",
      message: `your doctor account has been updated --> ${status}`,
      onClickpath: "/notification",
    });

    user.isdoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Doctor account has been updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in account status",
      error,
    });
  }
};

// GET USER DATA

const getUserData = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userID });
    res.status(201).send({
      success: true,
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: ` error while fetching user data : ${error.message}`,
      });
  }
};

module.exports = {
  getAllDoctorsControllers,
  getAllUsersControllers,
  ChangeAccountStatusController,
  getUserData,
};
