const { ErrorHandler } = require("../middleware/errorHandler");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return next(new ErrorHandler(400, "UserId param not sent with request"));
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return next(new ErrorHandler(400, "User not found"));
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getProfile,
};
