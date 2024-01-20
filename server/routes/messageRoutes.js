const express = require("express");
const router = express.Router();
const { messageController } = require("../controllers");
const { authVerifyToken } = require("../middleware//authVerifyToken");

router.get("/:chatId", authVerifyToken, messageController.fetchAllMessages);
router.post("/send", authVerifyToken, messageController.sendMessage);

module.exports = router;
