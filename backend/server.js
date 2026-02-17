import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import recipientRoutes from "./routes/recipientRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import bloodRequestRoutes from "./routes/bloodRequestRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/recipients", recipientRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/blood-requests", bloodRequestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inventory", inventoryRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));