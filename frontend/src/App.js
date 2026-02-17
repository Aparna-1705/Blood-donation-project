import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import DonorRegister from "./pages/DonorRegister";
import RecipientRegister from "./pages/RecipientRegister";
import Emergency from "./pages/Emergency";
import Appointments from "./pages/Appointments";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import FindDonor from "./pages/FindDonor";
import ManageDonors from "./pages/ManageDonors";
import ManageRecipients from "./pages/ManageRecipients";
import HospitalApprovals from "./pages/HospitalApprovals";
import BloodStock from "./pages/BloodStock";
import Campaigns from "./pages/Campaigns";
import Analytics from "./pages/Analytics";
import ScheduleCampaign from "./pages/ScheduleCampaign";



import "./App.css";

function CampaignTable() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/campaigns");
      setCampaigns(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load campaign data");
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h2 className="title">Blood Donation Campaigns</h2>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table className="campaign-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Campaign Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Organizer</th>
              <th>Contact</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No campaigns found
                </td>
              </tr>
            ) : (
              campaigns.map((c, index) => (
                <tr key={c._id || index}>
                  <td>{index + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.location}</td>
                  <td>{new Date(c.date).toLocaleDateString()}</td>
                  <td>{c.organizer}</td>
                  <td>{c.contact}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/inventory" element={<Inventory />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/appointments" element={<Appointments />} />

        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/recipient-register" element={<RecipientRegister />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/find-donor" element={<FindDonor />} />
        <Route path="/manage-donors" element={<ManageDonors />} />
        <Route path="/manage-recipients" element={<ManageRecipients />} />
        <Route path="/hospital-approvals" element={<HospitalApprovals />} />
        <Route path="/blood-stock" element={<BloodStock />} />
        <Route path="/schedule-campaign" element={<ScheduleCampaign />} />

        {/* Existing Campaign Page */}
        <Route path="/campaigns" element={<Campaigns />} />

        {/* New Campaign Table UI */}
        <Route path="/campaign-table" element={<CampaignTable />} />

        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;