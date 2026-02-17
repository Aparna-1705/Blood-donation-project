const router = require("express").Router();
const Donor = require("../models/Donor");
const User = require("../models/user"); // Import User model

// ===============================
// Register Donor (if using separate Donor model)
// ===============================
router.post("/register", async (req, res) => {
  try {
    const donor = await Donor.create(req.body);
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: "Donor registration failed", error: err.message });
  }
});

// ===============================
// Search Donors by Blood Group
// ===============================
router.get("/search/:bloodGroup", async (req, res) => {
  try {
    const donors = await User.find({
      role: "donor",
      bloodGroup: req.params.bloodGroup
    });

    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});

// ===============================
// Get All Donors (From Users Collection)
// ===============================
router.get("/", async (req, res) => {
  try {
    const donors = await User.find({ role: "donor" });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donors", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;