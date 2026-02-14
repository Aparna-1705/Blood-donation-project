const express = require("express");
const router = express.Router();
const Emergency = require("../models/Emergency");

router.post("/", async (req, res) => {
  const request = new Emergency(req.body);
  await request.save();
  res.json({ message: "Emergency Request Sent" });
});

router.get("/", async (req, res) => {
  const requests = await Emergency.find();
  res.json(requests);
});

module.exports = router;