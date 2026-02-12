const router = require("express").Router();
const Donor = require("../models/Donor");

router.post("/register", async (req, res) => {
  const donor = await Donor.create(req.body);
  res.json(donor);
});

router.get("/search/:bloodGroup", async (req, res) => {
  const donors = await Donor.find({ bloodGroup: req.params.bloodGroup });
  res.json(donors);
});

router.get("/", async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
});

module.exports = router;