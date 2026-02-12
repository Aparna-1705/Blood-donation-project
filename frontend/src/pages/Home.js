import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
        style={{
          minHeight: "90vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Donate Blood, Save Lives ❤️</h1>
          <p className="lead mt-3">
            Real-Time Blood Donation Management System connecting donors,
            recipients, hospitals, and blood banks.
          </p>

          <div className="mt-4">
            <Link to="/register" className="btn btn-danger btn-lg mx-2">
              Become a Donor
            </Link>
            <Link to="/recipient-register" className="btn btn-warning btn-lg mx-2">
              Request Blood
            </Link>
          </div>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="container my-5">
        <div className="row bg-danger text-white p-4 rounded shadow align-items-center">
          <div className="col-md-8">
            <h3>🚨 Emergency Blood Requirement</h3>
            <p>Send urgent requests and notify nearby donors instantly.</p>
          </div>
          <div className="col-md-4 text-end">
            <Link to="/emergency" className="btn btn-light btn-lg">
              Send Emergency Alert
            </Link>
          </div>
        </div>
      </div>

      {/* Core Features Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Our Core Features</h2>

        <div className="row g-4">

          <Feature title="Donor Registration" desc="Register & manage donor profiles"
            link="/register" />

          <Feature title="Blood Request" desc="Request blood based on urgency"
            link="/recipient-register" />

          <Feature title="Live Inventory" desc="Track blood stock in real-time"
            link="/inventory" />

          <Feature title="Appointment Scheduling" desc="Schedule donation appointments"
            link="/appointments" />

          <Feature title="Find Donors" desc="Search donors by blood group & location"
            link="/search-donor" />

          <Feature title="Admin Panel" desc="Manage donors, recipients, hospitals & reports"
            link="/admin" />

          <Feature title="Hospital Dashboard" desc="Manage inventory & fulfill requests"
            link="/hospital" />

          <Feature title="Reports & Analytics" desc="Monitor donation trends & availability"
            link="/reports" />

        </div>
      </div>

      {/* Campaign Section */}
      <div className="container-fluid bg-light py-5">
        <div className="container text-center">
          <h2>Donation Camps & Awareness Campaigns</h2>
          <p>Organized by hospitals and NGOs to encourage voluntary blood donation.</p>
          <Link to="/campaigns" className="btn btn-danger btn-lg">
            View Campaigns
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

const Feature = ({ title, desc, link }) => (
  <div className="col-md-3">
    <div className="card shadow h-100 text-center">
      <div className="card-body">
        <h5 className="card-title text-danger">{title}</h5>
        <p className="card-text">{desc}</p>
        <Link to={link} className="btn btn-outline-danger">
          Explore
        </Link>
      </div>
    </div>
  </div>
);

export default Home;