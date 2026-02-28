const router = require("express").Router();
const Donor = require("../models/Donor");
const Recipient = require("../models/Recipient");
const User = require("../models/user");

router.get("/stats", async (req, res) => {
  try {
    const [donorsFromDonorModel, donorsFromUserModel, recipients] = await Promise.all([
      Donor.countDocuments(),
      User.countDocuments({ role: "donor" }),
      Recipient.countDocuments()
    ]);

    const donors = donorsFromDonorModel + donorsFromUserModel;

    res.json({ donors, recipients });
  } catch (error) {
    res.status(500).json({ message: "Failed to load stats", error: error.message });
  }
});

module.exports = router;
