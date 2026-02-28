import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./BloodRequestApprovals.css";

function BloodRequestApprovals() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await API.get("/blood-requests");
      setRequests(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError("Failed to load blood requests");
    }
  };

  const approveRequest = async (id) => {
    try {
      await API.put(`/blood-requests/${id}/approve`);
      setError("");
      fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to approve blood request");
    }
  };

  const rejectRequest = async (id) => {
    try {
      await API.put(`/blood-requests/${id}/reject`);
      setError("");
      fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reject blood request");
    }
  };

  useEffect(function () {
    fetchRequests();
  }, []);

  return (
    <div className="br-page">
      <div className="br-card">
        <div className="br-header">
          <h2>Admin Approvals</h2>
          <span className="br-count">{requests.length} Requests</span>
        </div>

        {error && <p className="br-error">{error}</p>}

        {requests.length === 0 ? (
          <p className="br-info">No requests found.</p>
        ) : (
          <div className="br-table-wrap">
            <table className="br-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Blood Group</th>
                  <th>Units</th>
                  <th>Hospital</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.name}</td>
                    <td>
                      <span className="br-badge">{req.bloodGroup}</span>
                    </td>
                    <td>{req.units}</td>
                    <td>{req.hospital}</td>
                    <td>
                      <span
                        className={
                          req.status === "Approved"
                            ? "br-status approved"
                            : req.status === "Rejected"
                            ? "br-status rejected"
                            : "br-status pending"
                        }
                      >
                        {req.status}
                      </span>
                    </td>
                    <td>
                      {req.status === "Pending" && (
                        <div className="br-actions">
                          <button
                            className="br-approve-btn"
                            onClick={() => approveRequest(req._id)}
                          >
                            Approve
                          </button>
                          <button
                            className="br-reject-btn"
                            onClick={() => rejectRequest(req._id)}
                          >
                            Reject
                          </button>
                        </div>
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

export default BloodRequestApprovals;
