const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blood_donation_db";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";
const ADMIN_NAME = process.env.ADMIN_NAME || "System Admin";
const ADMIN_BLOOD_GROUP = process.env.ADMIN_BLOOD_GROUP || "O+";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await User.findOneAndUpdate(
      { email: ADMIN_EMAIL },
      {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        bloodGroup: ADMIN_BLOOD_GROUP,
        role: "admin",
      },
      { upsert: true, new: true }
    );

    console.log(`Admin user ready: ${ADMIN_EMAIL}`);
  } catch (error) {
    console.error("Failed to seed admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin();
