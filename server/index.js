const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./connectDB");
const app = express();

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

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  // socket.on("typing", (room) => socket.in(room).emit("typing"));
  // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    console.log(newMessageRecieved, "new");
    var chat = newMessageRecieved.chat;
    console.log(chat, "chat");
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  // socket.off("setup", () => {
  //   console.log("USER DISCONNECTED");
  //   socket.leave(userData._id);
  // });
});

// routes
app.use("/auth", authRoutes, errorMiddleware);
app.use("/chat", chatRoutes, errorMiddleware);
app.use("/message", messageRoutes, errorMiddleware);
app.use("/profile", profileRoutes, errorMiddleware);
