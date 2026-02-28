import React, { useState } from "react";
import API from "../services/api";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;
const CENTER_RE = /^[A-Za-z0-9\s.,'-]+$/;
const NAME_RE = /^[A-Za-z\s.'-]+$/;

const Appointments = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [form, setForm] = useState({
    donorName: String(user?.name || "").trim(),
    donorEmail: String(user?.email || "").trim().toLowerCase(),
    date: "",
    time: "",
    center: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "center" ? value.replace(/\s{2,}/g, " ") : value });
    if (error) setError("");
  };

  const validate = () => {
    const donorName = String(form.donorName || "").trim();
    const donorEmail = String(form.donorEmail || "").trim().toLowerCase();
    const date = String(form.date || "").trim();
    const time = String(form.time || "").trim();
    const center = String(form.center || "").trim();

    if (!donorName || !donorEmail || !date || !time || !center) return "All fields are required";
    if (donorName.length < 2 || donorName.length > 60) {
      return "Donor name must be between 2 and 60 characters";
    }
    if (!NAME_RE.test(donorName)) {
      return "Donor name contains invalid characters";
    }
    if (!/^\S+@\S+\.\S+$/.test(donorEmail)) {
      return "Enter a valid donor email address";
    }
    if (!DATE_RE.test(date)) return "Date must be in YYYY-MM-DD format";
    if (!TIME_RE.test(time)) return "Time must be in HH:mm format";
    if (center.length < 3 || center.length > 100) {
      return "Center must be between 3 and 100 characters";
    }
    if (!CENTER_RE.test(center)) {
      return "Center contains invalid characters";
    }

    const selectedDateTime = new Date(`${date}T${time}:00`);
    if (Number.isNaN(selectedDateTime.getTime())) {
      return "Invalid date or time selected";
    }
    if (selectedDateTime < new Date()) {
      return "Appointment must be in the future";
    }

    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await API.post("/appointments", {
        ...form,
        donorName: String(form.donorName || "").trim(),
        donorEmail: String(form.donorEmail || "").trim().toLowerCase(),
      });
      setSuccess("Appointment scheduled successfully");
      setForm((prev) => ({ ...prev, date: "", time: "", center: "" }));
    } catch (error) {
      setError(error.response?.data?.message || "Appointment scheduling failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.58)), url('https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "24px 0",
      }}
    >
      <div className="container mt-5 col-md-6">
        <h3 className="text-danger text-center">
          Schedule Donation Appointment
        </h3>

        <form onSubmit={submit} className="card p-4 shadow">
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <input
            name="donorName"
            className="form-control mb-3"
            placeholder="Donor Name"
            value={form.donorName}
            onChange={handleChange}
            minLength={2}
            maxLength={60}
            pattern="[A-Za-z\s.'-]+"
            title="Use letters, spaces, apostrophe, period or hyphen"
            required
          />

          <input
            type="email"
            name="donorEmail"
            className="form-control mb-3"
            placeholder="Donor Email"
            value={form.donorEmail}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            className="form-control mb-3"
            min={new Date().toISOString().split("T")[0]}
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            className="form-control mb-3"
            step="60"
            value={form.time}
            onChange={handleChange}
            required
          />

          <input
            name="center"
            className="form-control mb-3"
            placeholder="Donation Center"
            value={form.center}
            onChange={handleChange}
            minLength={3}
            maxLength={100}
            pattern="[A-Za-z0-9\s.,'-]+"
            title="Use letters, numbers, spaces, comma, period, apostrophe or hyphen"
            required
          />

          <button className="btn btn-danger w-100">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointments;
