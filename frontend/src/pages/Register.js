import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "",
    role: "donor",
    phone: "",
    age: "",
    address: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const validate = () => {
    const normalized = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      phone: form.phone.trim(),
      age: Number(form.age),
      address: form.address.trim(),
      bloodGroup: form.bloodGroup.trim().toUpperCase(),
      role: form.role.trim().toLowerCase(),
    };

    if (normalized.name.length < 2 || normalized.name.length > 60) {
      return "Name must be between 2 and 60 characters";
    }
    if (!/^[A-Za-z\s.'-]+$/.test(normalized.name)) {
      return "Name contains invalid characters";
    }
    if (!/^\S+@\S+\.\S+$/.test(normalized.email)) {
      return "Enter a valid email address";
    }
    if (
      normalized.password.length < 8 ||
      !/[A-Z]/.test(normalized.password) ||
      !/[a-z]/.test(normalized.password) ||
      !/[0-9]/.test(normalized.password) ||
      !/[^A-Za-z0-9]/.test(normalized.password)
    ) {
      return "Password must be 8+ chars with upper, lower, number and special character";
    }
    if (!/^\d{10,15}$/.test(normalized.phone)) {
      return "Phone number must contain 10 to 15 digits";
    }
    if (!Number.isInteger(normalized.age) || normalized.age < 18 || normalized.age > 65) {
      return "Age must be a whole number between 18 and 65";
    }
    if (normalized.address.length < 5 || normalized.address.length > 120) {
      return "Address must be between 5 and 120 characters";
    }
    if (!BLOOD_GROUPS.includes(normalized.bloodGroup)) {
      return "Select a valid blood group";
    }
    if (!["donor", "recipient", "hospital"].includes(normalized.role)) {
      return "Invalid role selected";
    }

    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    const validationMessage = validate();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    try {
      await API.post("/auth/register", form);
      alert("Registration Successful");
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Registration Failed";
      setError(message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h3 style={styles.heading}>User Registration</h3>
          {error && <p style={styles.error}>{error}</p>}

          <form onSubmit={submit}>
            <input
              style={styles.input}
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="email"
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="password"
              type="password"
              placeholder="Password (min 8 chars)"
              required
              value={form.password}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="phone"
              placeholder="Phone Number"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="age"
              type="number"
              min="18"
              max="65"
              placeholder="Age"
              required
              value={form.age}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="address"
              placeholder="Address"
              required
              value={form.address}
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

            <select
              style={styles.input}
              name="role"
              value={form.role}
              required
              onChange={handleChange}
            >
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
              <option value="hospital">Hospital</option>
            </select>

            <button style={styles.button}>Register</button>
          </form>

          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Already registered? <Link to="/login">Login</Link>
          </p>
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
  error: {
    color: "#c62828",
    textAlign: "center",
    marginBottom: "10px",
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

export default Register;
