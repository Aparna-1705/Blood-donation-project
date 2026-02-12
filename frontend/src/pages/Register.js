import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration Successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h3 style={styles.heading}>User Registration</h3>

          <form onSubmit={submit}>
            <input
              style={styles.input}
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="age"
              placeholder="Age"
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="bloodGroup"
              placeholder="Blood Group (A+, B+, O+)"
              required
              onChange={handleChange}
            />

            <select
              style={styles.input}
              name="role"
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
      "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b')",
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
};

export default Register;