import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h1 className="title">Admin Dashboard</h1>

      <div className="grid">
        <div className="card" onClick={() => navigate("/manage-donors")}>
          Manage Donors
        </div>

        <div className="card" onClick={() => navigate("/manage-recipients")}>
          Manage Recipients
        </div>

        <div className="card" onClick={() => navigate("/hospital-approvals")}>
          Hospital Approvals
        </div>

        <div className="card" onClick={() => navigate("/blood-stock")}>
          Blood Stock Reports
        </div>

        <div className="card" onClick={() => navigate("/campaigns")}>
          Donation Campaigns
        </div>

        <div className="card" onClick={() => navigate("/analytics")}>
          Analytics & Reports
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;