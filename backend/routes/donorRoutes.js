const router = require("express").Router();
const Donor = require("../models/Donor");
const User = require("../models/user");
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["Male", "Female", "Other"];

// ===============================
// Register Donor (if using separate Donor model)
// ===============================
router.post("/register", async (req, res) => {
  try {
    const { name, age, gender, bloodGroup, phone, city } = req.body;
    const trimmedName = String(name || "").trim();
    const parsedAge = Number(age);
    const normalizedGender = String(gender || "").trim();
    const normalizedBloodGroup = String(bloodGroup || "").trim().toUpperCase();
    const trimmedPhone = String(phone || "").trim();
    const trimmedCity = String(city || "").trim();

    if (!trimmedName || !age || !normalizedGender || !normalizedBloodGroup || !trimmedPhone || !trimmedCity) {
      return res.status(400).json({ message: "All donor fields are required" });
    }
    if (trimmedName.length < 2 || trimmedName.length > 60) {
      return res.status(400).json({ message: "Name must be between 2 and 60 characters" });
    }
    if (!/^[A-Za-z\s.'-]+$/.test(trimmedName)) {
      return res.status(400).json({ message: "Name contains invalid characters" });
    }
    if (!Number.isInteger(parsedAge) || parsedAge < 18 || parsedAge > 65) {
      return res.status(400).json({ message: "Age must be a whole number between 18 and 65" });
    }
    if (!GENDERS.includes(normalizedGender)) {
      return res.status(400).json({ message: "Invalid gender selected" });
    }
    if (!BLOOD_GROUPS.includes(normalizedBloodGroup)) {
      return res.status(400).json({ message: "Invalid blood group selected" });
    }
    if (!/^\d{10}$/.test(trimmedPhone)) {
      return res.status(400).json({ message: "Phone must contain exactly 10 digits" });
    }
    if (trimmedCity.length < 2 || trimmedCity.length > 60) {
      return res.status(400).json({ message: "City must be between 2 and 60 characters" });
    }
    if (!/^[A-Za-z\s.'-]+$/.test(trimmedCity)) {
      return res.status(400).json({ message: "City contains invalid characters" });
    }

    const existing = await Donor.findOne({ phone: trimmedPhone });
    if (existing) {
      return res.status(409).json({ message: "Donor already registered with this phone number" });
    }

    const donor = await Donor.create({
      name: trimmedName,
      age: parsedAge,
      gender: normalizedGender,
      bloodGroup: normalizedBloodGroup,
      phone: trimmedPhone,
      city: trimmedCity
    });

    res.status(201).json({ message: "Donor registered successfully", donor });
  } catch (err) {
    res.status(500).json({ message: "Donor registration failed", error: err.message });
  }
});

// ===============================
// Search Donors by Blood Group
// ===============================
router.get("/search/:bloodGroup", async (req, res) => {
  try {
    const bloodGroup = String(req.params.bloodGroup || "").trim().toUpperCase();
    if (!BLOOD_GROUPS.includes(bloodGroup)) {
      return res.status(400).json({ message: "Invalid blood group" });
    }

    const userDonors = await User.find({
      role: "donor",
      bloodGroup
    });
    const directDonors = await Donor.find({
      bloodGroup
    });

    res.json([...userDonors, ...directDonors]);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});

// ===============================
// Get All Donors (From Users Collection)
// ===============================
router.get("/", async (req, res) => {
  try {
    const userDonors = await User.find({ role: "donor" });
    const directDonors = await Donor.find();

    res.json([...userDonors, ...directDonors]);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donors", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedDonor = await Donor.findByIdAndDelete(req.params.id);
    const deletedUser = await User.findOneAndDelete({
      _id: req.params.id,
      role: "donor"
    });

    if (!deletedDonor && !deletedUser) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
