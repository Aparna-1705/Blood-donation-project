const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  units: { type: Number, required: true },
  hospital: { type: String, required: true },
  contact: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);