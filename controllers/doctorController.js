const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userID: req.body.userId });
    res.status(201).send({
      success: true,
      message: "doctor data fetched successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching doctor information",
      error,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      {
        userId: req.body.userId,
      },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "doctor profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating doctor information",
      error,
    });
  }
};

//  GET SINGLE DOCTOR INFO

const getSingleDcotorControllers = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });

    res.status(201).send({
      success: true,
      mesasge: "doctor details got successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Failed to get doctor information`,
      error,
    });
  }
};

const doctorAppointmentController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: `Appointments fetched successfully`,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Failed to get appointment details ${error}`,
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );

    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "appointment-status-update",
      message: `your appointment has been updated ${status}`,
      onClickpath: "/doctor-appointments",
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: `Your appointment has been updated`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Failed to update appointment status ${error}`,
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getSingleDcotorControllers,
  doctorAppointmentController,
  updateStatusController,
};
