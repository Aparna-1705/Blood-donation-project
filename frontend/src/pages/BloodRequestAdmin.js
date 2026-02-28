import React, { useEffect, useState } from "react";
import axios from "axios";

const BloodRequestAdmin = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/api/blood-requests");
    setRequests(res.data);
  };

  const handleApprove = async (id) => {
    await axios.put(`http://localhost:5000/api/blood-requests/${id}/approve`);
    fetchRequests();
  };

  const handleReject = async (id) => {
    await axios.put(`http://localhost:5000/api/blood-requests/${id}/reject`);
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Blood Requests (Admin/Hospital)</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Units</th>
            <th>Hospital</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.name}</td>
              <td>{req.bloodGroup}</td>
              <td>{req.units}</td>
              <td>{req.hospital}</td>
              <td>{req.contact}</td>
              <td>{req.status}</td>
              <td>
                {req.status === "Pending" && (
                  <>
                    <button onClick={() => handleApprove(req._id)}>Approve</button>
                    <button onClick={() => handleReject(req._id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodRequestAdmin;