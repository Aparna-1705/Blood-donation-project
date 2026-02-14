const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  center: String,
  status: { type: String, default: "Scheduled" }
});

module.exports = mongoose.model("Appointment", appointmentSchema);