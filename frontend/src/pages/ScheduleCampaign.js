import React, { useState } from "react";
import axios from "axios";
import "./ScheduleCampaign.css";

function ScheduleCampaign() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    date: "",
    organizer: "",
    contact: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/campaigns", form);
      alert("✅ Campaign Scheduled Successfully");
      setForm({
        name: "",
        location: "",
        date: "",
        organizer: "",
        contact: ""
      });
    } catch (err) {
      alert("❌ Failed to schedule campaign");
    }
  };

  return (
    <div className="camp-container">
      <div className="camp-card">
        <h2>Schedule Donation Camp</h2>
        <p>Organize a blood donation drive to save lives</p>

        <form onSubmit={submitHandler} className="camp-form">
          <input
            type="text"
            name="name"
            placeholder="Camp Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="organizer"
            placeholder="Organizer"
            value={form.organizer}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            required
          />

          <button type="submit">Schedule Camp</button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleCampaign;