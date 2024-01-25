const { ErrorHandler } = require("../middleware/errorHandler");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const cloudinary = require("cloudinary").v2;

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

const editProfile = async (req, res, next) => {
  try {
    const userid = req.user._id;
    if (!userid) {
      next(new ErrorHandler(400, "User id required"));
    }

    const user = await User.findById(userid);

    if (!user) {
      next(new ErrorHandler(400, "User not exists"));
    }

    let file = req.files ? req.files.file : null;

    console.log(file, "file");
    let photo = null;
    const { username } = req.body;

    if (file) {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
        folder: "media",
      });

      if (result.resource_type == "image") {
        photo = result.secure_url;
      }
    }
    user.username = username || user.username;
    user.photo = photo;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      msg: `Profile updated successfully`,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getProfile,
  editProfile,
};
