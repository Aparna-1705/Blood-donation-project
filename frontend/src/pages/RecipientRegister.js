import React, { useState } from "react";
import API from "../services/api";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const RecipientRegister = () => {
  const [form, setForm] = useState({
    name: "",
    hospital: "",
    bloodGroup: "",
    unitsRequired: "",
    phone: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const validate = () => {
    const name = form.name.trim();
    const hospital = form.hospital.trim();
    const bloodGroup = form.bloodGroup.trim().toUpperCase();
    const unitsRequired = Number(form.unitsRequired);
    const phone = form.phone.trim();
    const city = form.city.trim();

    if (!name || !hospital || !bloodGroup || !form.unitsRequired || !phone || !city) {
      return "All fields are required";
    }
    if (name.length < 2 || name.length > 60) {
      return "Name must be between 2 and 60 characters";
    }
    if (hospital.length < 2 || hospital.length > 80) {
      return "Hospital must be between 2 and 80 characters";
    }
    if (!BLOOD_GROUPS.includes(bloodGroup)) {
      return "Select a valid blood group";
    }
    if (!Number.isInteger(unitsRequired) || unitsRequired < 1 || unitsRequired > 20) {
      return "Units required must be between 1 and 20";
    }
    if (!/^\d{10,15}$/.test(phone)) {
      return "Phone must contain 10 to 15 digits";
    }
    if (city.length < 2 || city.length > 60) {
      return "City must be between 2 and 60 characters";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await API.post("/recipients/register", form);
      setSuccess("Recipient registered successfully");
      setForm({
        name: "",
        hospital: "",
        bloodGroup: "",
        unitsRequired: "",
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
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Blood Request Registration</h2>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}

          <form onSubmit={handleSubmit}>
            <input style={styles.input} type="text" name="name" placeholder="Patient Name" required value={form.name} onChange={handleChange} />

            <input style={styles.input} type="text" name="hospital" placeholder="Hospital Name" required value={form.hospital} onChange={handleChange} />

            <select style={styles.input} name="bloodGroup" required value={form.bloodGroup} onChange={handleChange}>
              <option value="">Blood Group</option>
              {BLOOD_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <input style={styles.input} type="number" min="1" max="20" name="unitsRequired" placeholder="Units Required" required value={form.unitsRequired} onChange={handleChange} />

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
  error: {
    color: "#c62828",
    textAlign: "center",
    marginBottom: "10px",
  },
  success: {
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: "10px",
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
