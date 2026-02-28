import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./BloodStock.css";

const BloodStock = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      setLoading(true);
      const res = await api.get("/inventory");
      setStock(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bs-page">
      <div className="bs-card">
        <div className="bs-header">
          <h2>Blood Stock Reports</h2>
          <span className="bs-count">{stock.length} Groups</span>
        </div>

        {loading && <p className="bs-info">Loading blood stock...</p>}
        {error && <p className="bs-error">{error}</p>}

        {!loading && !error && stock.length === 0 && (
          <p className="bs-info">No stock records found.</p>
        )}

        {!loading && !error && stock.length > 0 && (
          <div className="bs-table-wrap">
            <table className="bs-table">
              <thead>
                <tr>
                  <th>Blood Group</th>
                  <th>Units Available</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((s) => (
                  <tr key={s._id}>
                    <td>
                      <span className="bs-badge">{s.bloodGroup}</span>
                    </td>
                    <td>{s.units}</td>
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

export default BloodStock;
