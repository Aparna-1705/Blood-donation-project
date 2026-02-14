import React, { useState } from "react";
import API from "../services/api";

const Emergency = () => {
  const [form, setForm] = useState({ bloodGroup: "", units: "", city: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/recipient/emergency", form);
    alert("Emergency Request Sent Successfully");
  };

  return (
    <div className="container mt-5 col-md-6">
      <h3 className="text-danger text-center">Emergency Blood Request</h3>

      <form onSubmit={submit} className="card p-4 shadow">
        <input name="bloodGroup" className="form-control mb-3" placeholder="Blood Group" onChange={handleChange} required />
        <input name="units" className="form-control mb-3" placeholder="Units Needed" onChange={handleChange} required />
        <input name="city" className="form-control mb-3" placeholder="City" onChange={handleChange} required />
        <button className="btn btn-danger w-100">Send Emergency Alert</button>
      </form>
    </div>
  );
};

export default Emergency;