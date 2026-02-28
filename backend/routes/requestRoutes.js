const express = require("express");
const BloodRequest = require("../models/BloodRequest");

const router = express.Router();

// CREATE BLOOD REQUEST
router.post("/create", async (req, res) => {
  try {
    const request = new BloodRequest(req.body);
    await request.save();

    res.status(201).json({ message: "Blood request created", request });
  } catch (error) {
    console.error("Blood request error:", error);
    res.status(500).json({ message: "Request failed", error });
  }
});

module.exports = router;