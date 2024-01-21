const express = require("express");
const router = express.Router();
const { profileController } = require("../controllers");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.get("/view", authVerifyToken, profileController.getProfile);

module.exports = router;
