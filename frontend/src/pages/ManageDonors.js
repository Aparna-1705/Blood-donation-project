import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./ManageDonors.css";

const ManageDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const res = await api.get("/donors");
      setDonors(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError("Failed to load donors");
    } finally {
      setLoading(false);
    }
  };

  const deleteDonor = async (id) => {
    try {
      await api.delete(`/donors/${id}`);
      fetchDonors();
    } catch (err) {
      setError("Failed to delete donor");
    }
  };

  return (
    <div className="md-page">
      <div className="md-card">
        <div className="md-header">
          <h2>Manage Donors</h2>
          <span className="md-count">{donors.length} Donors</span>
        </div>

        {loading && <p className="md-info">Loading donors...</p>}
        {error && <p className="md-error">{error}</p>}

        {!loading && !error && donors.length === 0 && (
          <p className="md-info">No donor records found.</p>
        )}

        {!loading && !error && donors.length > 0 && (
          <div className="md-table-wrap">
            <table className="md-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((d) => (
                  <tr key={d._id}>
                    <td>{d.name || "-"}</td>
                    <td>
                      <span className="md-badge">{d.bloodGroup || "-"}</span>
                    </td>
                    <td>{d.phone || "-"}</td>
                    <td>
                      <button
                        className="md-delete-btn"
                        onClick={() => deleteDonor(d._id)}
                      >
                        Delete
                      </button>
                    </td>
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

export default ManageDonors;
