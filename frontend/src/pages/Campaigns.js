import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Campaigns.css";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const res = await API.get("/campaigns");
        setCampaigns(Array.isArray(res.data) ? res.data : []);
        setError("");
      } catch (err) {
        setError("Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="cp-page">
      <div className="cp-card">
        <div className="cp-header">
          <h2>Donation Campaigns</h2>
          <div className="cp-header-actions">
            <span className="cp-count">{campaigns.length} Campaigns</span>
            <button
              className="cp-new-btn"
              onClick={() => navigate("/schedule-campaign")}
            >
              Schedule Campaign
            </button>
          </div>
        </div>

        {loading && <p className="cp-info">Loading campaigns...</p>}
        {error && <p className="cp-error">{error}</p>}

        {!loading && !error && campaigns.length === 0 && (
          <p className="cp-info">No campaigns found.</p>
        )}

        {!loading && !error && campaigns.length > 0 && (
          <div className="cp-table-wrap">
            <table className="cp-table">
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
                {campaigns.map((c, index) => (
                  <tr key={c._id || index}>
                    <td>{index + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.location}</td>
                    <td>{new Date(c.date).toLocaleDateString()}</td>
                    <td>{c.organizer}</td>
                    <td>{c.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Campaigns;
