const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.post("/", async (req, res) => {
  const appt = new Appointment(req.body);
  await appt.save();
  res.json({ message: "Appointment Scheduled" });
});

router.get("/", async (req, res) => {
  const appts = await Appointment.find();
  res.json(appts);
});

module.exports = router;