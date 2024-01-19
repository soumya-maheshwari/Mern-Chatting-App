const { ErrorHandler } = require("../middleware/errorHandler");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const createChat = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return next(new ErrorHandler(400, "UserId param not sent with request"));
    }

    var isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    }).populate("users", "-password");

    isChat = await User.populate(isChat, {
      path: "users",
      select: "username email",
    });
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      // Populate FullChat before sending the response
      const populatedFullChat = await User.populate(FullChat, {
        path: "users",
        select: "username email",
      });

      return res.status(200).json({
        success: true,
        msg: "chat created",
        FullChat: populatedFullChat,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllChats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const allChats = await Chat.find({
      users: { $elemMatch: { $eq: userId } },
    }).populate("users", "-password");

    console.log(allChats);

    return res.status(200).json({
      success: true,
      msg: "All chats fetched successfully",
      chats: allChats,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(500, "Internal Server Error"));
  }
};

module.exports = {
  createChat,
  getAllChats,
};
