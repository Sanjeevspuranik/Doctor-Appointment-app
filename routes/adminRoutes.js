const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllDoctorsControllers,
  getAllUsersControllers,
  ChangeAccountStatusController,
  getUserInfoController,
  getUserData,
} = require("../controllers/adminController");

const router = express.Router();

// GET METHOD || ALL USERS
router.get("/getAllUsers", authMiddleware, getAllUsersControllers);

//  GET METHOS || single USER
router.get("/getUserData", authMiddleware, getUserData);

// GET METHOD || ALL DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsControllers);

// GET METHOD || ACCOUNT SATUS UPDATE
router.post(
  "/changeaccountstatus",
  authMiddleware,
  ChangeAccountStatusController
);

module.exports = router;
