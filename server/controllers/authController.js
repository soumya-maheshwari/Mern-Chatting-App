const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/userModel");
const { ErrorHandler } = require("../middleware/errorHandler");
const { validatepassword, validatEmail } = require("../utils/validations");

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_KEY, { expiresIn: "30d" });
};

const login = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    if (!(username && password)) {
      return next(new ErrorHandler(400, "username and password is required"));
    }

    const user = await User.findOne({ username });
    // console.log(user);
    if (!user) {
      return next(new ErrorHandler(404, "user not found"));
    }
    console.log(user);
    console.log(user.password);
    console.log(password);
    const result = await bcrypt.compare(password, user.password);
    console.log(result);
    // console.log(password);
    // console.log(user.password);
    if (!result) return next(new ErrorHandler(400, "Invalid Credentials"));

    const accessToken = createAccessToken({ id: user._id });

    return res.status(200).json({
      id: user._id,
      success: true,
      msg: `WELCOME ${user.username} !! login successful`,
      user,
      accessToken,
    });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return next(new ErrorHandler(400, "all fields are required "));
    }

    if (!validatEmail(email)) {
      return next(new ErrorHandler(400, "Incorrect email format is provided"));
    }
    const user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler(400, "Email already exists"));
    }

    const user2 = await User.findOne({ username });

    if (user2) {
      return next(new ErrorHandler(400, "username already exists"));
    }
    const pass = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      username,
      password: pass,
    });

    const savedUser = await newUser.save();
    const accessToken = createAccessToken({ id: newUser._id });

    return res.status(200).json({
      success: true,
      msg: `Welcome , ${username}, SignUp sucessful`,
      accessToken,
      user: newUser,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const searchUser = async (req, res, next) => {
  try {
    const { search } = req.query;

    const user = await User.find({
      $or: [
        { username: { $regex: search, $options: "i" } }, // Case-insensitive username search
        { email: { $regex: search, $options: "i" } }, // Case-insensitive name search
      ],
    }).select("id email username");

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  login,
  signUp,
  searchUser,
};
