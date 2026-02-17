const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    organizer: { type: String, required: true },
    contact: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);