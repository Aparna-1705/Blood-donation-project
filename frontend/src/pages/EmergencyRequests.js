import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./EmergencyRequests.css";

function EmergencyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");

  const fetchEmergencyRequests = async () => {
    try {
      const res = await API.get("/emergency");
      setRequests(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load emergency requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencyRequests();
  }, []);

  const updateEmergencyStatus = async (id, action) => {
    try {
      setUpdatingId(id);
      setError("");
      await API.put(`/emergency/${id}/${action}`);
      await fetchEmergencyRequests();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update emergency request");
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <div className="container mt-5 emergency-requests-page">
      <div className="card shadow p-4 emergency-requests-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-danger m-0 emergency-requests-title">Emergency Requests</h3>
          <button className="btn btn-outline-danger btn-sm emergency-requests-refresh" onClick={fetchEmergencyRequests}>
            Refresh
          </button>
        </div>

        {loading && <p className="emergency-requests-message">Loading...</p>}
        {error && <p className="text-danger emergency-requests-message">{error}</p>}

        {!loading && !error && requests.length === 0 && (
          <p className="text-muted mb-0 emergency-requests-message">No emergency requests found.</p>
        )}

        {!loading && !error && requests.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered align-middle emergency-requests-table">
              <thead className="table-light">
                <tr>
                  <th>Blood Group</th>
                  <th>Units</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.bloodGroup}</td>
                    <td>{request.units}</td>
                    <td>{request.city}</td>
                    <td>{request.status || "Pending"}</td>
                    <td>{new Date(request.date).toLocaleString()}</td>
                    <td>
                      {(request.status || "Pending") === "Pending" ? (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-success emergency-action-btn"
                            disabled={updatingId === request._id}
                            onClick={() => updateEmergencyStatus(request._id, "approve")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger emergency-action-btn"
                            disabled={updatingId === request._id}
                            onClick={() => updateEmergencyStatus(request._id, "reject")}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted">No action</span>
                      )}
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
}

export default EmergencyRequests;
