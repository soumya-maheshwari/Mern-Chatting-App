const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const { ErrorHandler } = require("../middleware/errorHandler");

const fetchAllMessages = async (req, res, next) => {
  try {
    // console.log(req.params.chatId);
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", " email username")
      .populate("chat");

    return res.json({
      msg: "messages fetching successfull",
      messages,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  const { content, chatId } = req.body;
  console.log(chatId, "chat id");
  if (!content) {
    next(new ErrorHandler(400, "Enter some text to send"));
  }
  if (!chatId) {
    next(new ErrorHandler(400, "invalid data passed into request"));
  } else {
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
    console.log(newMessage, "new messssageee");
    try {
      var message = await Message.create(newMessage);
      console.log(message, "message");
      message = await message.populate("sender", " email username");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: " email username",
      });
      console.log(message, "messaaage");
      await Chat.findByIdAndUpdate(
        chatId,
        {
          latestMessage: message,
        },
        {
          new: true,
        }
      );
      return res.json({
        message,
        msg: "Message sent",
        success: true,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
};

module.exports = {
  fetchAllMessages,
  sendMessage,
};
