import express from "express";
import BloodRequest from "../models/BloodRequest.js";

const router = express.Router();

// GET all blood requests
router.get("/", async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// APPROVE blood request
router.put("/:id/approve", async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request)
      return res.status(404).json({ message: "Request not found" });

    request.status = "approved";
    await request.save();

    res.json({ message: "Blood request approved", request });
  } catch (err) {
    console.error("Approval error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;