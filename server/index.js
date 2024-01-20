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

// routes
app.use("/auth", authRoutes, errorMiddleware);
app.use("/chat", chatRoutes, errorMiddleware);
app.use("/message", messageRoutes, errorMiddleware);
