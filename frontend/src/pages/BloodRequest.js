import { useState } from "react";
import API from "../services/api";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function BloodRequest() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    units: "",
    hospital: "",
    contact: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const name = form.name.trim();
    const bloodGroup = form.bloodGroup.trim().toUpperCase();
    const units = Number(form.units);
    const hospital = form.hospital.trim();
    const contact = form.contact.trim();

    if (!name || !bloodGroup || !form.units || !hospital || !contact) {
      return "All fields are required";
    }
    if (name.length < 2 || name.length > 60) {
      return "Patient name must be between 2 and 60 characters";
    }
    if (!/^[A-Za-z\s.'-]+$/.test(name)) {
      return "Patient name contains invalid characters";
    }
    if (!BLOOD_GROUPS.includes(bloodGroup)) {
      return "Select a valid blood group";
    }
    if (!Number.isInteger(units) || units < 1 || units > 20) {
      return "Units must be a whole number between 1 and 20";
    }
    if (hospital.length < 2 || hospital.length > 100) {
      return "Hospital name must be between 2 and 100 characters";
    }
    if (!/^\d{10}$/.test(contact)) {
      return "Contact must contain exactly 10 digits";
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
      const res = await API.post("/blood-requests", form);
      setMessage(res.data?.message || "Blood request submitted successfully");
      setForm({
        name: "",
        bloodGroup: "",
        units: "",
        hospital: "",
        contact: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting request");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h3 style={styles.heading}>Blood Request Form</h3>

          {message && <p style={styles.success}>{message}</p>}
          {error && <p style={styles.fail}>{error}</p>}

          <form onSubmit={submit}>
            <input
              style={styles.input}
              name="name"
              placeholder="Patient Name"
              required
              value={form.name}
              onChange={handleChange}
            />

            <select
              style={styles.input}
              name="bloodGroup"
              required
              value={form.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              {BLOOD_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <input
              style={styles.input}
              name="units"
              type="number"
              min="1"
              max="20"
              placeholder="Units Required"
              required
              value={form.units}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="hospital"
              placeholder="Hospital Name"
              required
              value={form.hospital}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="contact"
              placeholder="Contact Number"
              required
              value={form.contact}
              onChange={handleChange}
            />

            <button style={styles.button} type="submit">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
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

export default BloodRequest;
