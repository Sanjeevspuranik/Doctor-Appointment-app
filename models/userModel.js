const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  isdoctor: {
    type: Boolean,
    default: false,
  },

  notification: {
    type: Array,
    default: [],
  },
  
  seennotification: {
    type: Array,
    default: [],
  },

  phone: {
    type: String,
    required: [true, "password is required"],
  },
});

const userModel = mongoose.model("user", userSchema);
userModel.collection.createIndex({ email: 1 }, { unique: true });
module.exports = userModel;
