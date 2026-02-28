const express = require("express");
const router = express.Router();
const Rating = require("../models/Rating");

router.post("/", async (req, res) => {
  try {
    const score = Number(req.body?.score);
    const feedback = String(req.body?.feedback || "").trim();
    const userName = String(req.body?.userName || "").trim();
    const userRole = String(req.body?.userRole || "").trim().toLowerCase();

    if (!Number.isInteger(score) || score < 1 || score > 5) {
      return res.status(400).json({ message: "Rating score must be between 1 and 5" });
    }
    if (feedback.length > 500) {
      return res.status(400).json({ message: "Feedback must be at most 500 characters" });
    }
    if (userName.length > 60) {
      return res.status(400).json({ message: "Username must be at most 60 characters" });
    }
    if (userRole && !["donor", "recipient", "hospital", "admin"].includes(userRole)) {
      return res.status(400).json({ message: "Invalid user role for rating" });
    }

    const rating = await Rating.create({
      score,
      feedback,
      userName,
      userRole,
    });

    return res.status(201).json({ message: "Rating submitted successfully", rating });
  } catch (err) {
    return res.status(500).json({ message: "Failed to submit rating" });
  }
});

router.get("/summary", async (req, res) => {
  try {
    const stats = await Rating.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          average: { $avg: "$score" },
        },
      },
    ]);

    if (!stats.length) {
      return res.json({ count: 0, average: 0 });
    }

    return res.json({
      count: stats[0].count,
      average: Number(stats[0].average.toFixed(1)),
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch rating summary" });
  }
});

module.exports = router;
