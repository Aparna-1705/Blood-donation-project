import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./ManageRecipients.css";

const ManageRecipients = () => {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    try {
      setLoading(true);
      const res = await api.get("/recipients");
      setRecipients(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError("Failed to load recipients");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mr-page">
      <div className="mr-card">
        <div className="mr-header">
          <h2>Manage Recipients</h2>
          <span className="mr-count">{recipients.length} Recipients</span>
        </div>

        {loading && <p className="mr-info">Loading recipients...</p>}
        {error && <p className="mr-error">{error}</p>}

        {!loading && !error && recipients.length === 0 && (
          <p className="mr-info">No recipient records found.</p>
        )}

        {!loading && !error && recipients.length > 0 && (
          <div className="mr-table-wrap">
            <table className="mr-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((r) => (
                  <tr key={r._id}>
                    <td>{r.name || "-"}</td>
                    <td>
                      <span className="mr-badge">{r.bloodGroup || "-"}</span>
                    </td>
                    <td>{r.phone || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRecipients;
