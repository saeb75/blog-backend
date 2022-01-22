const express = require("express");
const {
  registerController,
  loginController,
} = require("../controller/authController");
const { validate } = require("../midallware/Validation");
const router = express.Router();
router.post("/register", validate("register"), registerController);
router.post("/login", validate("login"), loginController);
module.exports = router;
