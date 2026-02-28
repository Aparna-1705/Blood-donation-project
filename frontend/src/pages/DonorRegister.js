import React, { useState } from "react";
import API from "../services/api";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["Male", "Female", "Other"];

const DonorRegister = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    city: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const validate = () => {
    const name = form.name.trim();
    const age = Number(form.age);
    const gender = form.gender.trim();
    const bloodGroup = form.bloodGroup.trim().toUpperCase();
    const phone = form.phone.trim();
    const city = form.city.trim();

    if (!name || !form.age || !gender || !bloodGroup || !phone || !city) {
      return "All donor fields are required";
    }
    if (name.length < 2 || name.length > 60) {
      return "Name must be between 2 and 60 characters";
    }
    if (!/^[A-Za-z\s.'-]+$/.test(name)) {
      return "Name contains invalid characters";
    }
    if (!Number.isInteger(age) || age < 18 || age > 65) {
      return "Age must be a whole number between 18 and 65";
    }
    if (!GENDERS.includes(gender)) {
      return "Select a valid gender";
    }
    if (!BLOOD_GROUPS.includes(bloodGroup)) {
      return "Select a valid blood group";
    }
    if (!/^\d{10}$/.test(phone)) {
      return "Phone must contain exactly 10 digits";
    }
    if (city.length < 2 || city.length > 60) {
      return "City must be between 2 and 60 characters";
    }
    if (!/^[A-Za-z\s.'-]+$/.test(city)) {
      return "City contains invalid characters";
    }
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        age: Number(form.age),
        bloodGroup: form.bloodGroup.trim().toUpperCase(),
        phone: form.phone.trim(),
        city: form.city.trim(),
      };
      const res = await API.post("/donors/register", payload);
      setMessage(res.data?.message || "Donor registered successfully");

      setForm({
        name: "",
        age: "",
        gender: "",
        bloodGroup: "",
        phone: "",
        city: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h3 style={styles.heading}>Donor Registration</h3>
          {message && <p style={styles.success}>{message}</p>}
          {error && <p style={styles.fail}>{error}</p>}

          <form onSubmit={submit}>
            <input style={styles.input} name="name" placeholder="Name" value={form.name} onChange={handleChange} required />

            <input style={styles.input} type="number" min="18" max="65" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />

            <select style={styles.input} name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <select style={styles.input} name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required>
              <option value="">Blood Group</option>
              {BLOOD_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <input style={styles.input} name="phone" placeholder="Phone (10 digits)" value={form.phone} onChange={handleChange} required />

            <input style={styles.input} name="city" placeholder="City" value={form.city} onChange={handleChange} required />

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
      "url('https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg')",
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
  success: {
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: "10px",
  },
  fail: {
    color: "#c62828",
    textAlign: "center",
    marginBottom: "10px",
  },
};

export default DonorRegister;
