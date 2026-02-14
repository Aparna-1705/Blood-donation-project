import React from "react";

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-danger">Admin Dashboard</h2>

      <div className="row mt-4">
        <DashboardCard title="Manage Donors" />
        <DashboardCard title="Manage Recipients" />
        <DashboardCard title="Hospital Approvals" />
        <DashboardCard title="Blood Stock Reports" />
        <DashboardCard title="Donation Campaigns" />
        <DashboardCard title="Analytics & Reports" />
      </div>
    </div>
  );
};

const DashboardCard = ({ title }) => (
  <div className="col-md-4 mb-4">
    <div className="card shadow text-center p-4">
      <h5>{title}</h5>
    </div>
  </div>
);

export default AdminDashboard;