import React, { useState } from "react";
import API from "../services/api";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Emergency = () => {
  const [form, setForm] = useState({ bloodGroup: "", units: "", city: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const bloodGroup = String(form.bloodGroup || "").trim().toUpperCase();
    const units = Number(form.units);
    const city = String(form.city || "").trim();

    if (!bloodGroup || !form.units || !city) return "All fields are required";
    if (!BLOOD_GROUPS.includes(bloodGroup)) return "Select a valid blood group";
    if (!Number.isInteger(units) || units < 1 || units > 20) {
      return "Units must be a whole number between 1 and 20";
    }
    if (city.length < 2 || city.length > 60) {
      return "City must be between 2 and 60 characters";
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
      await API.post("/emergency", form);
      setSuccess("Emergency request sent successfully");
      setForm({ bloodGroup: "", units: "", city: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send emergency request");
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h3 className="text-danger text-center">Emergency Blood Request</h3>

      <form onSubmit={submit} className="card p-4 shadow">
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}

        <select
          name="bloodGroup"
          className="form-control mb-3"
          value={form.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <input
          name="units"
          type="number"
          min="1"
          max="20"
          className="form-control mb-3"
          placeholder="Units Needed"
          value={form.units}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          className="form-control mb-3"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <button className="btn btn-danger w-100">Send Emergency Alert</button>
      </form>
    </div>
  );
};

export default Emergency;
