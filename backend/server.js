const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socketio = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// =======================
// MongoDB Connection
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// =======================
// Import Routes
// =======================
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const recipientRoutes = require("./routes/recipientRoutes");

// Inventory routes require socket instance
const inventoryRoutes = require("./routes/inventoryRoutes")(io);

// =======================
// API Routes
// =======================
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/recipient", recipientRoutes);
app.use("/api/inventory", inventoryRoutes);

// =======================
// Socket Connection
// =======================
io.on("connection", (socket) => {
  console.log("New Client Connected");

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

// =======================
// Server Start
// =======================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});