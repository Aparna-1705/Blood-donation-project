const express = require("express");
const router = express.Router();
const {
  getAllBloodRequests,
  createBloodRequest,
  approveBloodRequest,
  rejectBloodRequest,
} = require("../controllers/bloodRequestController");

router.post("/", createBloodRequest);
router.get("/", getAllBloodRequests);
router.put("/:id/approve", approveBloodRequest);
router.put("/:id/reject", rejectBloodRequest);

module.exports = router;
