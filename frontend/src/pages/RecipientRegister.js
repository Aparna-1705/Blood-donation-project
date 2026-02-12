import React, { useState } from "react";
import API from "../services/api";

const RecipientRegister = () => {
  const [form, setForm] = useState({
    name: "",
    hospital: "",
    bloodGroup: "",
    unitsRequired: "",
    phone: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/recipient/register", form);
      alert("Recipient Registered Successfully");
      setForm({
        name: "",
        hospital: "",
        bloodGroup: "",
        unitsRequired: "",
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
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Blood Request Registration</h2>

          <form onSubmit={handleSubmit}>
            <input style={styles.input} type="text" name="name" placeholder="Patient Name" required value={form.name} onChange={handleChange} />

            <input style={styles.input} type="text" name="hospital" placeholder="Hospital Name" required value={form.hospital} onChange={handleChange} />

            <select style={styles.input} name="bloodGroup" required value={form.bloodGroup} onChange={handleChange}>
              <option value="">Blood Group</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option>
              <option>O+</option><option>O-</option>
            </select>

            <input style={styles.input} type="number" name="unitsRequired" placeholder="Units Required" required value={form.unitsRequired} onChange={handleChange} />

            <input style={styles.input} type="tel" name="phone" placeholder="Contact Number" required value={form.phone} onChange={handleChange} />

            <input style={styles.input} type="text" name="city" placeholder="City" required value={form.city} onChange={handleChange} />

            <button style={styles.button} type="submit">Request Blood</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: `url("https://images.unsplash.com/photo-1582719478250-c89cae4dc85b")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  formContainer: {
    background: "#ffffff",
    padding: "30px",
    width: "380px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#c62828",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    background: "#c62828",
    color: "#fff",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default RecipientRegister;