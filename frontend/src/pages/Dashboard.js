import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h3 className="text-danger text-center">Dashboard</h3>

      <div className="row mt-4">
        <div className="col-md-3">
          <Link to="/find-donor" className="btn btn-danger w-100">
            Find Donor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;