const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");

const PHONE_RE = /^\d{10,15}$/;

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
    const name = String(req.body.name || "").trim();
    const location = String(req.body.location || "").trim();
    const organizer = String(req.body.organizer || "").trim();
    const contact = String(req.body.contact || "").trim();
    const dateRaw = String(req.body.date || "").trim();

    if (!name || !location || !organizer || !contact || !dateRaw) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: "Campaign name must be between 3 and 100 characters" });
    }
    if (location.length < 3 || location.length > 120) {
      return res.status(400).json({ message: "Location must be between 3 and 120 characters" });
    }
    if (organizer.length < 2 || organizer.length > 80) {
      return res.status(400).json({ message: "Organizer must be between 2 and 80 characters" });
    }
    if (!PHONE_RE.test(contact)) {
      return res.status(400).json({ message: "Contact must contain 10 to 15 digits" });
    }

    const date = new Date(dateRaw);
    if (Number.isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid campaign date" });
    }

    const campaign = await Campaign.create({ name, location, date, organizer, contact });
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Failed to create campaign" });
  }
});

module.exports = router;
