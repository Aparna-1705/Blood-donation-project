import React from "react";

const HospitalDashboard = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-danger">Hospital Dashboard</h2>

      <div className="row mt-4">
        <PanelCard title="Manage Inventory" />
        <PanelCard title="Approve Blood Requests" />
        <PanelCard title="Schedule Donation Camps" />
        <PanelCard title="View Reports" />
      </div>
    </div>
  );
};

const PanelCard = ({ title }) => (
  <div className="col-md-3 mb-4">
    <div className="card shadow text-center p-4">
      <h5>{title}</h5>
    </div>
  </div>
);

export default HospitalDashboard;