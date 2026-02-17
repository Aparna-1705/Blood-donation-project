import React, { useState } from "react";
import API from "../services/api";

const Appointments = () => {
  const [form, setForm] = useState({ date: "", time: "", center: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/appointment", form);  // ✅ FIXED
      alert("Appointment Scheduled Successfully");
    } catch (error) {
      console.error(error);
      alert("Appointment Scheduling Failed");
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h3 className="text-danger text-center">
        Schedule Donation Appointment
      </h3>

      <form onSubmit={submit} className="card p-4 shadow">
        <input
          type="date"
          name="date"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="center"
          className="form-control mb-3"
          placeholder="Donation Center"
          onChange={handleChange}
          required
        />

        <button className="btn btn-danger w-100">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointments;