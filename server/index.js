const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./connectDB");
const app = express();
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 5000;

const { errorMiddleware } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(errorMiddleware);

// Connection to DataBase
connectDB();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// routes
app.use("/auth", authRoutes, errorMiddleware);
app.use("/chat", chatRoutes, errorMiddleware);
app.use("/message", messageRoutes, errorMiddleware);
app.use("/profile", profileRoutes, errorMiddleware);
