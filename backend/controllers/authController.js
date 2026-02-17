const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    console.log("Received Data:", req.body);

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      phone,
      age,
      address,
      bloodGroup,
      role
    });

    res.status(201).json({ message: "Registration successful", user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
      expiresIn: "1d"
    });

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = { register, login };