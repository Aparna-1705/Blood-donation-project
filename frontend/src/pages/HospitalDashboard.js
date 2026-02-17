import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function HospitalDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Hospital Dashboard</h2>

      <div className="dashboard-grid">
        <div
          className="dashboard-card"
          onClick={() => navigate("/inventory")}
        >
          Manage Inventory
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/hospital-approvals")}
        >
          Approve Blood Requests
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/analytics")}
        >
          View Reports
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/schedule-campaign")}
        >
          Schedule Donation Camps
        </div>
      </div>
    </div>
  );
}

export default HospitalDashboard;