const express = require("express");
const router = express.Router();
const Emergency = require("../models/Emergency");

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

router.post("/", async (req, res) => {
  try {
    const bloodGroup = String(req.body.bloodGroup || "").trim().toUpperCase();
    const units = Number(req.body.units);
    const city = String(req.body.city || "").trim();

    if (!bloodGroup || !units || !city) {
      return res.status(400).json({ message: "Blood group, units and city are required" });
    }
    if (!BLOOD_GROUPS.includes(bloodGroup)) {
      return res.status(400).json({ message: "Invalid blood group" });
    }
    if (!Number.isInteger(units) || units < 1 || units > 20) {
      return res.status(400).json({ message: "Units must be a whole number between 1 and 20" });
    }
    if (city.length < 2 || city.length > 60) {
      return res.status(400).json({ message: "City must be between 2 and 60 characters" });
    }

    const request = new Emergency({ bloodGroup, units, city });
    await request.save();
    res.json({ message: "Emergency Request Sent", request });
  } catch (err) {
    res.status(500).json({ message: "Failed to create emergency request" });
  }
});

router.get("/", async (req, res) => {
  try {
    const requests = await Emergency.find().sort({ date: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch emergency requests" });
  }
});

router.put("/:id/approve", async (req, res) => {
  try {
    const request = await Emergency.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Emergency request not found" });
    }

    request.status = "Approved";
    await request.save();
    return res.json({ message: "Emergency request approved", request });
  } catch (err) {
    return res.status(500).json({ message: "Failed to approve emergency request" });
  }
});

router.put("/:id/reject", async (req, res) => {
  try {
    const request = await Emergency.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Emergency request not found" });
    }

    request.status = "Rejected";
    await request.save();
    return res.json({ message: "Emergency request rejected", request });
  } catch (err) {
    return res.status(500).json({ message: "Failed to reject emergency request" });
  }
});

module.exports = router;
