const router = require("express").Router();
const Recipient = require("../models/Recipient");

router.post("/register", async (req, res) => {
  const rec = await Recipient.create(req.body);
  res.json(rec);
});

router.get("/", async (req, res) => {
  const data = await Recipient.find();
  res.json(data);
});

module.exports = router;