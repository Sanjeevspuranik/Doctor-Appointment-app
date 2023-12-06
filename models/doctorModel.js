const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
    },

    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },

    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },

    address: {
      type: String,
      required: [true, "address is required"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
    },

    phone: {
      type: String,
      required: [true, "phone number is required"],
    },

    website: {
      type: String,
    },

    specialization: {
      type: String,
      required: [true, "specialization is required"],
    },

    experience: {
      type: String,
      required: [true, "experience is required"],
    },

    feesperconsultancy: {
      type: Number,
      required: [true, "fee is required"],
    },

    status: {
      type: String,
      default: "pending",
    },

    timings: {
      start: {
        type: String,
        required: [true, "start is required"],
      },
      end: {
        type: String,
        required: [true, "end is required"],
      },
    },
  },

  { timestamps: true }
);

const doctorModel = mongoose.model("doctor", doctorSchema);
module.exports = doctorModel;
