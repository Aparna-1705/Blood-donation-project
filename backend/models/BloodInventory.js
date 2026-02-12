const mongoose = require("mongoose");

const bloodInventorySchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
    unique: true
  },
  units: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model("BloodInventory", bloodInventorySchema);