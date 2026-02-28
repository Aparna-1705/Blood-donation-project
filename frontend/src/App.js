import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CoreFeatures from "./pages/CoreFeatures";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import DonorRegister from "./pages/DonorRegister";
import RecipientRegister from "./pages/RecipientRegister";
import Emergency from "./pages/Emergency";
import EmergencyRequests from "./pages/EmergencyRequests";
import Appointments from "./pages/Appointments";
import AppointmentsList from "./pages/AppointmentsList";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import FindDonor from "./pages/FindDonor";
import SearchDonor from "./pages/SearchDonor";
import ManageDonors from "./pages/ManageDonors";
import ManageRecipients from "./pages/ManageRecipients";
import BloodStock from "./pages/BloodStock";
import Campaigns from "./pages/Campaigns";
import Analytics from "./pages/Analytics";
import ScheduleCampaign from "./pages/ScheduleCampaign";
import HospitalApprovals from "./pages/HospitalApprovals";
import BloodRequestApprovals from "./pages/BloodRequestApprovals";
import BloodRequestAdmin from "./pages/BloodRequestAdmin";
import BloodRequest from "./pages/BloodRequest";
import AdminLogin from "./pages/AdminLogin";

import "./App.css";

function CampaignTable() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCampaigns = async function () {
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

  useEffect(function () {
    fetchCampaigns();
  }, []);

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
              campaigns.map(function (c, index) {
                return (
                  <tr key={c._id || index}>
                    <td>{index + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.location}</td>
                    <td>{new Date(c.date).toLocaleDateString()}</td>
                    <td>{c.organizer}</td>
                    <td>{c.contact}</td>
                  </tr>
                );
              })
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
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/core-features" element={<CoreFeatures />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminLogin />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/inventory" element={<Inventory />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/emergency-requests" element={<EmergencyRequests />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments-list" element={<AppointmentsList />} />

        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/recipient-register" element={<RecipientRegister />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/find-donor" element={<FindDonor />} />
        <Route path="/search-donor" element={<SearchDonor />} />
        <Route path="/manage-donors" element={<ManageDonors />} />
        <Route path="/manage-recipients" element={<ManageRecipients />} />

        <Route path="/hospital-approvals" element={<HospitalApprovals />} />
        <Route path="/blood-request-approvals" element={<BloodRequestApprovals />} />

        <Route path="/blood-stock" element={<BloodStock />} />
        <Route path="/schedule-campaign" element={<ScheduleCampaign />} />

        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaign-table" element={<CampaignTable />} />

        <Route path="/analytics" element={<Analytics />} />
        <Route path="/blood-request-admin" element={<BloodRequestAdmin />} />
        <Route path="/request-blood" element={<BloodRequest />} />
        <Route path="/blood-request" element={<BloodRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
