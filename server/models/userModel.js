const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    required: true,
    type: String,
  },

  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default:
      "https://res.cloudinary.com/ddpliadl5/image/upload/v1720169598/media/1720169586991.png",
  },
});

module.exports = mongoose.model("User", userSchema);
