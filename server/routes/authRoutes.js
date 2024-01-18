const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { authVerifyToken } = require("../middleware//authVerifyToken");

router.post("/login", authController.login);
router.post("/signup", authController.signUp);

module.exports = router;
