import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Analytics.css";

const Analytics = () => {
  const [stats, setStats] = useState({
    donors: 0,
    recipients: 0,
    totalUnits: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, inventoryRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/inventory"),
        ]);

        const totalUnits = inventoryRes.data.reduce(
          (sum, item) => sum + (Number(item.units) || 0),
          0
        );

        setStats({
          donors: statsRes.data?.donors || 0,
          recipients: statsRes.data?.recipients || 0,
          totalUnits,
        });
      } catch (err) {
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="an-page">
      <div className="an-wrap">
        <h2>Analytics & Reports</h2>
        {loading && <p className="an-info">Loading analytics...</p>}
        {error && <p className="an-error">{error}</p>}
        {!loading && !error && (
          <>
            <div className="an-grid">
              <div className="an-stat-card donors">
                <p className="an-label">Total Donors</p>
                <h3>{stats.donors}</h3>
              </div>

              <div className="an-stat-card recipients">
                <p className="an-label">Total Recipients</p>
                <h3>{stats.recipients}</h3>
              </div>

              <div className="an-stat-card units">
                <p className="an-label">Total Blood Units</p>
                <h3>{stats.totalUnits}</h3>
              </div>
            </div>

            <div className="an-report-card">
              <h4>Summary Report</h4>
              <p>
                Current donor-to-recipient ratio:{" "}
                <strong>
                  {stats.recipients > 0
                    ? (stats.donors / stats.recipients).toFixed(2)
                    : "N/A"}
                </strong>
              </p>
              <p>
                Average units per recipient:{" "}
                <strong>
                  {stats.recipients > 0
                    ? (stats.totalUnits / stats.recipients).toFixed(2)
                    : "N/A"}
                </strong>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
