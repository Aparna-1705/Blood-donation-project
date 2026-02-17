const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);