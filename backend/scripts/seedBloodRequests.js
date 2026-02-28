const mongoose = require("mongoose");
const dotenv = require("dotenv");
const BloodRequest = require("../models/BloodRequest");

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blood_donation_db";

const samples = [
  {
    name: "Aparna V",
    bloodGroup: "A+",
    units: 2,
    hospital: "City Hospital",
    contact: "9999999999",
    status: "Pending",
  },
  {
    name: "Rahul K",
    bloodGroup: "O+",
    units: 3,
    hospital: "General Hospital",
    contact: "9888888888",
    status: "Pending",
  },
  {
    name: "Meera S",
    bloodGroup: "B+",
    units: 1,
    hospital: "District Hospital",
    contact: "9777777777",
    status: "Pending",
  },
];

async function seedBloodRequests() {
  try {
    await mongoose.connect(MONGO_URI);
    await BloodRequest.insertMany(samples);
    console.log(`Inserted ${samples.length} blood requests`);
  } catch (error) {
    console.error("Failed to seed blood requests:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedBloodRequests();
