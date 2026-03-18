import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideAuthLinks = location.pathname === "/core-features";
  const hideNavbarRoutes = ["/login", "/admin-login", "/register"];
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h2>Blood Donation System</h2>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/home" className={isLoggedIn ? "home-icon-link" : ""}>
            Home
          </Link>
        </li>

        {!isLoggedIn && !hideAuthLinks && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        {!isLoggedIn && (
          <li>
            <Link to="/admin-login">Admin Login</Link>
          </li>
        )}

        {!isLoggedIn && !hideAuthLinks && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
