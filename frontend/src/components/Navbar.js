import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h2>Blood Donation System</h2>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/find-donor">Find Donor</Link>
        </li>

        <li>
          <Link to="/inventory">Inventory</Link>
        </li>

        <li>
          <Link to="/appointments">Appointments</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/campaign-table">Campaign Table</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;