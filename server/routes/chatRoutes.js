const express = require("express");
const router = express.Router();
const { chatController } = require("../controllers");
const { authVerifyToken } = require("../middleware//authVerifyToken");

router.post("/create", authVerifyToken, chatController.createChat);
router.get("/all", authVerifyToken, chatController.getAllChats);

module.exports = router;
