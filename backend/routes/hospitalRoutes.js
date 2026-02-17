const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");

// GET all hospitals
router.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (err) {
    console.error("Hospital fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;