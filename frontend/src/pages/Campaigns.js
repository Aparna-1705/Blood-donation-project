import React from "react";
import { useNavigate } from "react-router-dom";

function Campaigns() {
  const navigate = useNavigate();

  return (
    <div className="campaign-hero">
      <h1>Donation Camps & Awareness Campaigns</h1>
      <p>Organized by hospitals and NGOs to encourage voluntary blood donation.</p>

      <button
        className="view-btn"
        onClick={() => navigate("/campaign-table")}
      >
        View Campaigns
      </button>
    </div>
  );
}

export default Campaigns;