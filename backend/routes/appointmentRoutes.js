const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;
const CENTER_RE = /^[A-Za-z0-9\s.,'-]+$/;

router.post("/", async (req, res) => {
  try {
    const date = String(req.body.date || "").trim();
    const time = String(req.body.time || "").trim();
    const center = String(req.body.center || "").trim();
    const donorName = String(req.body.donorName || "").trim();
    const donorEmail = String(req.body.donorEmail || "").trim().toLowerCase();

    if (!date || !time || !center) {
      return res.status(400).json({ message: "Date, time and center are required" });
    }
    if (!DATE_RE.test(date)) {
      return res.status(400).json({ message: "Date must be in YYYY-MM-DD format" });
    }
    if (!TIME_RE.test(time)) {
      return res.status(400).json({ message: "Time must be in HH:mm format" });
    }
    if (center.length < 3 || center.length > 100) {
      return res.status(400).json({ message: "Center must be between 3 and 100 characters" });
    }
    if (!CENTER_RE.test(center)) {
      return res.status(400).json({ message: "Center contains invalid characters" });
    }
    if (donorName && (donorName.length < 2 || donorName.length > 60)) {
      return res.status(400).json({ message: "Donor name must be between 2 and 60 characters" });
    }
    if (donorEmail && !/^\S+@\S+\.\S+$/.test(donorEmail)) {
      return res.status(400).json({ message: "Enter a valid donor email address" });
    }

    const selectedDateTime = new Date(`${date}T${time}:00`);
    if (Number.isNaN(selectedDateTime.getTime())) {
      return res.status(400).json({ message: "Invalid date or time selected" });
    }
    if (selectedDateTime < new Date()) {
      return res.status(400).json({ message: "Appointment must be in the future" });
    }

    const appt = new Appointment({ date, time, center, donorName, donorEmail });
    await appt.save();
    res.json({ message: "Appointment Scheduled", appointment: appt });
  } catch (err) {
    res.status(500).json({ message: "Failed to schedule appointment" });
  }
});

router.get("/", async (req, res) => {
  try {
    const appts = await Appointment.find().sort({ createdAt: -1 });
    res.json(appts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
});

router.put("/:id/approve", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = "Approved";
    await appointment.save();
    return res.json({ message: "Appointment approved", appointment });
  } catch (err) {
    return res.status(500).json({ message: "Failed to approve appointment" });
  }
});

router.put("/:id/reject", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = "Rejected";
    await appointment.save();
    return res.json({ message: "Appointment rejected", appointment });
  } catch (err) {
    return res.status(500).json({ message: "Failed to reject appointment" });
  }
});

module.exports = router;
