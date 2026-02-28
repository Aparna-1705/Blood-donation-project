const router = require("express").Router();
const Recipient = require("../models/Recipient");

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

router.post("/register", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const hospital = String(req.body.hospital || "").trim();
    const bloodGroup = String(req.body.bloodGroup || "").trim().toUpperCase();
    const unitsRequired = Number(req.body.unitsRequired);
    const phone = String(req.body.phone || "").trim();
    const city = String(req.body.city || "").trim();

    if (!name || !hospital || !bloodGroup || !unitsRequired || !phone || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (name.length < 2 || name.length > 60) {
      return res.status(400).json({ message: "Name must be between 2 and 60 characters" });
    }
    if (hospital.length < 2 || hospital.length > 80) {
      return res.status(400).json({ message: "Hospital must be between 2 and 80 characters" });
    }
    if (!BLOOD_GROUPS.includes(bloodGroup)) {
      return res.status(400).json({ message: "Invalid blood group" });
    }
    if (!Number.isInteger(unitsRequired) || unitsRequired < 1 || unitsRequired > 20) {
      return res.status(400).json({ message: "Units required must be a whole number between 1 and 20" });
    }
    if (!/^\d{10,15}$/.test(phone)) {
      return res.status(400).json({ message: "Phone must contain 10 to 15 digits" });
    }
    if (city.length < 2 || city.length > 60) {
      return res.status(400).json({ message: "City must be between 2 and 60 characters" });
    }

    const rec = await Recipient.create({
      name,
      hospital,
      bloodGroup,
      unitsRequired,
      phone,
      city,
    });
    res.status(201).json(rec);
  } catch (err) {
    res.status(500).json({ message: "Recipient registration failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Recipient.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recipients" });
  }
});

module.exports = router;
