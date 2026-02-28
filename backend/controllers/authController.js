const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const ALLOWED_REGISTER_ROLES = ["donor", "recipient", "hospital"];
const ALLOWED_LOGIN_ROLES = ["donor", "recipient", "hospital", "admin"];

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      age,
      address,
      bloodGroup,
      role
    } = req.body;

    const normalized = {
      name: String(name || "").trim(),
      email: String(email || "").trim().toLowerCase(),
      password: String(password || ""),
      phone: String(phone || "").trim(),
      age: Number(age),
      address: String(address || "").trim(),
      bloodGroup: String(bloodGroup || "").trim().toUpperCase(),
      role: String(role || "").trim().toLowerCase()
    };

    const errors = [];

    if (!normalized.name || normalized.name.length < 2 || normalized.name.length > 60) {
      errors.push("Name must be between 2 and 60 characters");
    }

    if (!/^[A-Za-z\s.'-]+$/.test(normalized.name)) {
      errors.push("Name contains invalid characters");
    }

    if (!/^\S+@\S+\.\S+$/.test(normalized.email)) {
      errors.push("Enter a valid email address");
    }

    if (
      normalized.password.length < 8 ||
      !/[A-Z]/.test(normalized.password) ||
      !/[a-z]/.test(normalized.password) ||
      !/[0-9]/.test(normalized.password) ||
      !/[^A-Za-z0-9]/.test(normalized.password)
    ) {
      errors.push("Password must be 8+ chars with upper, lower, number and special character");
    }

    if (!/^\d{10,15}$/.test(normalized.phone)) {
      errors.push("Phone number must contain 10 to 15 digits");
    }

    if (!Number.isInteger(normalized.age) || normalized.age < 18 || normalized.age > 65) {
      errors.push("Age must be a whole number between 18 and 65");
    }

    if (normalized.address.length < 5 || normalized.address.length > 120) {
      errors.push("Address must be between 5 and 120 characters");
    }

    if (!BLOOD_GROUPS.includes(normalized.bloodGroup)) {
      errors.push("Select a valid blood group");
    }

    if (!ALLOWED_REGISTER_ROLES.includes(normalized.role)) {
      errors.push("Invalid role selected");
    }

    if (errors.length) {
      return res.status(400).json({ message: errors[0], errors });
    }

    const existingUser = await User.findOne({ email: normalized.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(normalized.password, 10);

    const user = await User.create({
      name: normalized.name,
      email: normalized.email,
      password: hashed,
      phone: normalized.phone,
      age: normalized.age,
      address: normalized.address,
      bloodGroup: normalized.bloodGroup,
      role: normalized.role
    });

    res.status(201).json({ message: "Registration successful", user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const identifier = String(req.body?.email || "").trim();
    const normalizedEmail = identifier.toLowerCase();
    const password = String(req.body?.password || "");
    const role = String(req.body?.role || "").trim().toLowerCase();

    if (!identifier || !password || !role) {
      return res.status(400).json({ message: "Email/username, password and role are required" });
    }

    if (!ALLOWED_LOGIN_ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const escapedIdentifier = identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let user = null;

    if (/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      const escapedEmail = normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      user = await User.findOne({
        email: { $regex: `^${escapedEmail}$`, $options: "i" }
      });
    }

    if (!user) {
      user = await User.findOne({
        name: { $regex: `^${escapedIdentifier}$`, $options: "i" }
      });
    }

    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    if (user.role !== role) {
      return res.status(400).json({ message: "Selected role does not match this account" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
      expiresIn: "1d"
    });

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = { register, login };
