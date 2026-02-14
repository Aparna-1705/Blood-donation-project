const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
  bloodGroup: String,
  units: Number,
  city: String,
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Emergency", emergencySchema);