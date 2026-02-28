import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./AdminLogin.css";

function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin",
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
      const user = res.data?.user;

      if (!user || user.role !== "admin") {
        setError("Access denied. Admin account required.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-overlay">
        <div className="admin-login-card">
          <h3>Admin Panel Login</h3>
          <p>Sign in with admin credentials to access dashboard controls.</p>

          {error && <div className="admin-login-error">{error}</div>}

          <form onSubmit={submit}>
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              required
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Login as Admin"}
            </button>
          </form>

          <p className="admin-login-foot">
            User login? <Link to="/login">Go to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
