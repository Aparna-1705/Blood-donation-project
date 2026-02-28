const BloodRequest = require("../models/BloodRequest");
const BloodInventory = require("../models/BloodInventory");

const normalizeBloodGroup = (value = "") => String(value).trim().toUpperCase();
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Get all blood requests
const getAllBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new blood request
const createBloodRequest = async (req, res) => {
  try {
    const { name, bloodGroup, units, hospital, contact } = req.body;
    const trimmedName = String(name || "").trim();
    const normalizedBloodGroup = normalizeBloodGroup(bloodGroup);
    const parsedUnits = Number(units);
    const trimmedHospital = String(hospital || "").trim();
    const trimmedContact = String(contact || "").trim();

    if (!trimmedName || !normalizedBloodGroup || !units || !trimmedHospital || !trimmedContact) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (trimmedName.length < 2 || trimmedName.length > 60) {
      return res.status(400).json({ message: "Patient name must be between 2 and 60 characters" });
    }
    if (!/^[A-Za-z\s.'-]+$/.test(trimmedName)) {
      return res.status(400).json({ message: "Patient name contains invalid characters" });
    }
    if (!BLOOD_GROUPS.includes(normalizedBloodGroup)) {
      return res.status(400).json({ message: "Select a valid blood group" });
    }
    if (!Number.isFinite(parsedUnits) || parsedUnits <= 0) {
      return res.status(400).json({ message: "Units must be greater than 0" });
    }
    if (!Number.isInteger(parsedUnits) || parsedUnits > 20) {
      return res.status(400).json({ message: "Units must be a whole number between 1 and 20" });
    }
    if (trimmedHospital.length < 2 || trimmedHospital.length > 100) {
      return res.status(400).json({ message: "Hospital name must be between 2 and 100 characters" });
    }
    if (!/^\d{10}$/.test(trimmedContact)) {
      return res.status(400).json({ message: "Contact must contain exactly 10 digits" });
    }

    const newRequest = new BloodRequest({
      name: trimmedName,
      bloodGroup: normalizedBloodGroup,
      units: parsedUnits,
      hospital: trimmedHospital,
      contact: trimmedContact,
    });
    await newRequest.save();

    res.status(201).json({
      message: "Blood request submitted successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error("Blood Request Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Approve a blood request
const approveBloodRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (String(request.status).toLowerCase() === "approved") {
      return res.json(request);
    }

    const normalizedBloodGroup = normalizeBloodGroup(request.bloodGroup);
    const requestedUnits = Number(request.units);

    const inventory = await BloodInventory.findOne({ bloodGroup: normalizedBloodGroup });
    if (!inventory || inventory.units < requestedUnits) {
      return res.status(400).json({
        message: `Insufficient inventory for ${normalizedBloodGroup}. Requested ${requestedUnits}, available ${inventory?.units || 0}`,
      });
    }

    inventory.units -= requestedUnits;
    await inventory.save();

    request.bloodGroup = normalizedBloodGroup;
    request.status = "Approved";
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject a blood request
const rejectBloodRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBloodRequests,
  createBloodRequest,
  approveBloodRequest,
  rejectBloodRequest,
};
