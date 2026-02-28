import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./HospitalApprovals.css";

function HospitalApprovals() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/blood-requests");
      setRequests(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load blood requests");
      setLoading(false);
    }
  };

  const approveRequest = async (id) => {
    try {
      await API.put(`/blood-requests/${id}/approve`);
      setError("");
      fetchRequests();
    } catch (err) {
      console.error("Approval error:", err);
      setError(err.response?.data?.message || "Approval failed");
    }
  };

  const rejectRequest = async (id) => {
    try {
      await API.put(`/blood-requests/${id}/reject`);
      setError("");
      fetchRequests();
    } catch (err) {
      console.error("Rejection error:", err);
      setError(err.response?.data?.message || "Rejection failed");
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "Pending");
  const pastRequests = requests.filter((r) => r.status !== "Pending");

  return (
    <div className="ha-page">
      <div className="ha-card">
        <div className="ha-header">
          <h2>Hospital Approvals</h2>
          <div className="ha-header-actions">
            <span className="ha-count">{pendingRequests.length} Pending</span>
            <button
              className="ha-toggle-btn"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "View Pending Only" : "View All"}
            </button>
          </div>
        </div>

        {loading && <p className="ha-info">Loading requests...</p>}
        {error && <p className="ha-error">{error}</p>}

        {!loading && !error && (
          <>
            {!showAll && (
              <>
                <h3 className="ha-section-title">Upcoming Requests</h3>
                {pendingRequests.length === 0 ? (
                  <p className="ha-info">No pending requests.</p>
                ) : (
                  <div className="ha-table-wrap">
                    <table className="ha-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Patient</th>
                          <th>Blood Group</th>
                          <th>Units</th>
                          <th>Hospital</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingRequests.map((r, i) => (
                          <tr key={r._id}>
                            <td>{i + 1}</td>
                            <td>{r.name}</td>
                            <td>
                              <span className="ha-badge">{r.bloodGroup}</span>
                            </td>
                            <td>{r.units}</td>
                            <td>{r.hospital}</td>
                            <td>
                              <span className="ha-status pending">{r.status}</span>
                            </td>
                            <td>
                              <div className="ha-actions">
                                <button
                                  className="ha-approve-btn"
                                  onClick={() => approveRequest(r._id)}
                                >
                                  Approve
                                </button>
                                <button
                                  className="ha-reject-btn"
                                  onClick={() => rejectRequest(r._id)}
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <h3 className="ha-section-title">Previous Requests</h3>
                {pastRequests.length === 0 ? (
                  <p className="ha-info">No previous requests.</p>
                ) : (
                  <div className="ha-table-wrap">
                    <table className="ha-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Patient</th>
                          <th>Blood Group</th>
                          <th>Units</th>
                          <th>Hospital</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pastRequests.map((r, i) => (
                          <tr key={r._id}>
                            <td>{i + 1}</td>
                            <td>{r.name}</td>
                            <td>
                              <span className="ha-badge">{r.bloodGroup}</span>
                            </td>
                            <td>{r.units}</td>
                            <td>{r.hospital}</td>
                            <td>
                              <span
                                className={
                                  r.status === "Approved"
                                    ? "ha-status approved"
                                    : "ha-status rejected"
                                }
                              >
                                {r.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {showAll && (
              <>
                <h3 className="ha-section-title">All Requests</h3>
                {requests.length === 0 ? (
                  <p className="ha-info">No requests found.</p>
                ) : (
                  <div className="ha-table-wrap">
                    <table className="ha-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Patient</th>
                          <th>Blood Group</th>
                          <th>Units</th>
                          <th>Hospital</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map((r, i) => (
                          <tr key={r._id}>
                            <td>{i + 1}</td>
                            <td>{r.name}</td>
                            <td>
                              <span className="ha-badge">{r.bloodGroup}</span>
                            </td>
                            <td>{r.units}</td>
                            <td>{r.hospital}</td>
                            <td>
                              <span
                                className={
                                  r.status === "Approved"
                                    ? "ha-status approved"
                                    : r.status === "Rejected"
                                    ? "ha-status rejected"
                                    : "ha-status pending"
                                }
                              >
                                {r.status}
                              </span>
                            </td>
                            <td>
                              {r.status === "Pending" && (
                                <div className="ha-actions">
                                  <button
                                    className="ha-approve-btn"
                                    onClick={() => approveRequest(r._id)}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    className="ha-reject-btn"
                                    onClick={() => rejectRequest(r._id)}
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HospitalApprovals;
