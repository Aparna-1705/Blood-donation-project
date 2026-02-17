import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HospitalApprovals.css";

function HospitalApprovals() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/blood-requests"
      );
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load blood requests");
      setLoading(false);
    }
  };

  const approveRequest = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/blood-requests/${id}/approve`
      );
      fetchRequests();
      alert("Request Approved Successfully");
    } catch (err) {
      console.error("Approval error:", err);
      alert("Approval failed");
    }
  };

  return (
    <div className="approval-container">
      <h2>Blood Request Approvals</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table className="approval-table">
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
            {requests.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((r, i) => (
                <tr key={r._id}>
                  <td>{i + 1}</td>
                  <td>{r.patientName}</td>
                  <td>{r.bloodGroup}</td>
                  <td>{r.units}</td>
                  <td>{r.hospitalName}</td>
                  <td>{r.status}</td>
                  <td>
                    {r.status === "pending" && (
                      <button
                        className="approve-btn"
                        onClick={() => approveRequest(r._id)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HospitalApprovals;