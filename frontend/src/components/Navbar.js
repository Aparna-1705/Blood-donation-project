import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const hideAuthLinks = location.pathname === "/core-features";
  const hideNavbarRoutes = ["/login"];
  const isLoggedIn = Boolean(localStorage.getItem("token"));

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
            {isLoggedIn ? (
              <span className="home-icon" aria-label="Home" title="Home">
                &#8962;
              </span>
            ) : (
              "Home"
            )}
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
      </ul>
    </nav>
  );
};

export default Navbar;
