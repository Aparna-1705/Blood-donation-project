import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/donors",
});

// ===============================
// Register Donor
// ===============================
export const registerDonor = (donorData) => {
  return API.post("/register", donorData);
};

// ===============================
// Login Donor
// ===============================
export const loginDonor = (loginData) => {
  return API.post("/login", loginData);
};

// ===============================
// Get All Donors
// ===============================
export const getAllDonors = () => {
  return API.get("/");
};

// ===============================
// Get Single Donor
// ===============================
export const getDonorById = (id) => {
  return API.get(`/${id}`);
};

// ===============================
// Update Donor
// ===============================
export const updateDonor = (id, donorData) => {
  return API.put(`/${id}`, donorData);
};

// ===============================
// Delete Donor  ✅ FIXED
// ===============================
export const deleteDonor = (id) => {
  return API.delete(`/${id}`);
};