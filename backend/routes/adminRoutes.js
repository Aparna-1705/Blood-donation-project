const router = require("express").Router();
const Donor = require("../models/Donor");
const Recipient = require("../models/Recipient");

router.get("/stats", async (req, res) => {
  const donors = await Donor.countDocuments();
  const recipients = await Recipient.countDocuments();

  res.json({ donors, recipients });
});

module.exports = router;