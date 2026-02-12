import React, { useState } from "react";
import API from "../services/api";

const DonorRegister = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/donor/register", form);
      alert("Donor Registered Successfully");

      setForm({
        name: "",
        age: "",
        gender: "",
        bloodGroup: "",
        phone: "",
        city: "",
      });
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h3 style={styles.heading}>Donor Registration</h3>

          <form onSubmit={submit}>
            <input style={styles.input} name="name" placeholder="Name" onChange={handleChange} required />

            <input style={styles.input} name="age" placeholder="Age" onChange={handleChange} required />

            <select style={styles.input} name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <select style={styles.input} name="bloodGroup" onChange={handleChange} required>
              <option value="">Blood Group</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option>
              <option>O+</option><option>O-</option>
            </select>

            <input style={styles.input} name="phone" placeholder="Phone" onChange={handleChange} required />

            <input style={styles.input} name="city" placeholder="City" onChange={handleChange} required />

            <button style={styles.button}>Register Donor</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1612277794895-597f93ad1e38')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "30px",
    width: "400px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
  },
  heading: {
    textAlign: "center",
    color: "#c62828",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#c62828",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default DonorRegister;