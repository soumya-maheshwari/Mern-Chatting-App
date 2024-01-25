const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./utils/connectDB");
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
const server = app.listen(PORT, () => {
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

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("User connected");

  // Handle chat messages
  socket.on("chat message", (msg) => {
    console.log(msg);

    socket.broadcast.emit("chat message", msg);
  });

  // Handle typing indicator
  socket.on("typing", (msg) => {
    console.log(msg.chatId, "typing");
    socket.broadcast.emit("typing"); // Broadcast to all clients except the sender
  });

  socket.on("stop typing", () => {
    console.log("Typing indicator reset");
    // You can use a UI element to reset the typing indicator
  });

  // Handle new message notification
  socket.on("new message", (data) => {
    // io.emit("new message"); // Broadcast the notification to all connected clients
    console.log(data);
    // Emit the new message notification to the receiver
    socket.broadcast.to(data.chatId).emit("new message");
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// routes
app.use("/auth", authRoutes, errorMiddleware);
app.use("/chat", chatRoutes, errorMiddleware);
app.use("/message", messageRoutes, errorMiddleware);
app.use("/profile", profileRoutes, errorMiddleware);
