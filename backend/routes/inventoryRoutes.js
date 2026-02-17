const express = require("express");
const router = express.Router();
const Inventory = require("../models/BloodInventory");

// Add or Update Inventory
router.post("/", async (req, res) => {
  try {
    const { bloodGroup, units } = req.body;

    let record = await Inventory.findOne({ bloodGroup });

    if (record) {
      record.units += units;
      await record.save();
    } else {
      record = await Inventory.create({ bloodGroup, units });
    }

    res.json({ message: "Inventory Updated", record });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Inventory List
router.get("/", async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;