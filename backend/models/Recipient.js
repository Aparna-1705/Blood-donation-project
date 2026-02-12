const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema({
  name: String,
  hospital: String,
  bloodGroup: String,
  unitsRequired: Number,
  phone: String,
  city: String,
});

module.exports = mongoose.model("Recipient", recipientSchema);