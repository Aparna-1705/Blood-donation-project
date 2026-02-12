const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  bloodGroup: String,
  phone: String,
  city: String,
});

module.exports = mongoose.model("Donor", donorSchema);