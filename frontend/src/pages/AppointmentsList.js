import React, { useEffect, useState } from "react";
import API from "../services/api";

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/appointments");
      setAppointments(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (id, action) => {
    try {
      setUpdatingId(id);
      setError("");
      await API.put(`/appointments/${id}/${action}`);
      await fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update appointment status");
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-danger m-0">Donor Appointments</h3>
          <button className="btn btn-outline-danger btn-sm" onClick={fetchAppointments}>
            Refresh
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && appointments.length === 0 && (
          <p className="text-muted mb-0">No appointments found.</p>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Donor Name</th>
                  <th>Donor Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Center</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt._id}>
                    <td>{appt.donorName || "-"}</td>
                    <td>{appt.donorEmail || "-"}</td>
                    <td>{appt.date}</td>
                    <td>{appt.time}</td>
                    <td>{appt.center}</td>
                    <td>{appt.status || "Scheduled"}</td>
                    <td>
                      {appt.status === "Approved" || appt.status === "Rejected" ? (
                        <span className="text-muted">No action</span>
                      ) : (
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            disabled={updatingId === appt._id}
                            onClick={() => updateAppointmentStatus(appt._id, "approve")}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            disabled={updatingId === appt._id}
                            onClick={() => updateAppointmentStatus(appt._id, "reject")}
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

export default AppointmentsList;
