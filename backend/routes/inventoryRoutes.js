const express = require("express");
const router = express.Router();
const BloodInventory = require("../models/BloodInventory");

module.exports = (io) => {

  // Get inventory
  router.get("/", async (req, res) => {
    const inventory = await BloodInventory.find();
    res.json(inventory);
  });

  // Update inventory
  router.post("/update", async (req, res) => {
    const { bloodGroup, units } = req.body;

    let record = await BloodInventory.findOne({ bloodGroup });

    if (record) {
      record.units += units;
      if (record.units < 0) record.units = 0;
      await record.save();
    } else {
      record = await BloodInventory.create({ bloodGroup, units });
    }

    io.emit("inventoryUpdate", record); // Real-time update

    res.json({ message: "Inventory updated", record });
  });

  return router;
};