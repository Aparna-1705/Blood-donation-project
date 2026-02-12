import React, { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 shadow text-center">
            <h4>Total Donors</h4>
            <h2>{stats.donors}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow text-center">
            <h4>Total Recipients</h4>
            <h2>{stats.recipients}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;