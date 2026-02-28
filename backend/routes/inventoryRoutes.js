const express = require("express");
const router = express.Router();
const Inventory = require("../models/BloodInventory");
const normalizeBloodGroup = (value = "") => String(value).trim().toUpperCase();

// Add or Update Inventory
router.post("/", async (req, res) => {
  try {
    const { bloodGroup, units } = req.body;
    const normalizedBloodGroup = normalizeBloodGroup(bloodGroup);
    const parsedUnits = Number(units);

    if (!normalizedBloodGroup || !Number.isFinite(parsedUnits) || parsedUnits <= 0) {
      return res.status(400).json({ message: "Valid bloodGroup and units (> 0) are required" });
    }

    let record = await Inventory.findOne({ bloodGroup: normalizedBloodGroup });

    if (record) {
      record.units += parsedUnits;
      await record.save();
    } else {
      record = await Inventory.create({ bloodGroup: normalizedBloodGroup, units: parsedUnits });
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
