const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");

// GET all campaigns from MongoDB
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ date: 1 });
    res.status(200).json(campaigns);
  } catch (err) {
    console.error("Campaign fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/", async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;