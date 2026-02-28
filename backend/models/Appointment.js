const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  center: String,
  donorName: String,
  donorEmail: String,
  status: { type: String, default: "Scheduled" }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
