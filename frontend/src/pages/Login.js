import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "donor",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login-page">
      <div className="user-login-overlay">
        <div className="user-login-card">
          <h3>Login Page</h3>
          <p>Sign in with your registered account to open the dashboard.</p>

          {error && <div className="user-login-error">{error}</div>}

          <form onSubmit={submit}>
            <input
              type="text"
              name="email"
              placeholder="Enter your email / username"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
              <option value="hospital">Hospital</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <p className="user-login-foot">
            Admin login? <Link to="/admin-login">Go to Admin Login</Link>
          </p>

          <p className="user-login-foot">
            New User? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
