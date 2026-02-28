import React, { useState } from "react";
import API from "../services/api";
import "./ScheduleCampaign.css";

function ScheduleCampaign() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    date: "",
    organizer: "",
    contact: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const name = form.name.trim();
    const location = form.location.trim();
    const date = form.date.trim();
    const organizer = form.organizer.trim();
    const contact = form.contact.trim();

    if (!name || !location || !date || !organizer || !contact) {
      return "All fields are required";
    }
    if (name.length < 3 || name.length > 100) {
      return "Camp name must be between 3 and 100 characters";
    }
    if (location.length < 3 || location.length > 120) {
      return "Location must be between 3 and 120 characters";
    }
    if (organizer.length < 2 || organizer.length > 80) {
      return "Organizer must be between 2 and 80 characters";
    }
    if (!/^\d{10,15}$/.test(contact)) {
      return "Contact must contain 10 to 15 digits";
    }
    return "";
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await API.post("/campaigns", form);
      setSuccess("Campaign scheduled successfully");
      setForm({ name: "", location: "", date: "", organizer: "", contact: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule campaign");
    }
  };

  return (
    <div className="camp-container">
      <div className="camp-card">
        <h2>Schedule Donation Camp</h2>
        <p>Organize a blood donation drive to save lives</p>
        <form onSubmit={submitHandler} className="camp-form">
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
          <input type="text" name="name" placeholder="Camp Name" value={form.name} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <input type="date" name="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={handleChange} required />
          <input type="text" name="organizer" placeholder="Organizer" value={form.organizer} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} required />
          <button type="submit">Schedule Camp</button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleCampaign;
