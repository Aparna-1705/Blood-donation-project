import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import API from "../services/api";
import "./Home.css";

const Home = () => {
  const storedUser = localStorage.getItem("user");
  let userName = "";
  let userRole = "";
  try {
    const parsedUser = JSON.parse(storedUser || "{}");
    userName = parsedUser?.name || "";
    userRole = parsedUser?.role || "";
  } catch (e) {
    userName = "";
    userRole = "";
  }

  const normalizedRole = String(userRole).toLowerCase();
  const isDonor = normalizedRole === "donor";
  const isRecipient = normalizedRole === "recipient";
  const isHospital = normalizedRole === "hospital";
  const isAdmin = normalizedRole === "admin";
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [ratingSummary, setRatingSummary] = useState("No ratings yet");

  const fetchRatingSummary = async () => {
    try {
      const res = await API.get("/ratings/summary");
      const count = Number(res.data?.count || 0);
      const average = Number(res.data?.average || 0);
      if (!count) {
        setRatingSummary("No ratings yet");
        return;
      }
      setRatingSummary(`${average.toFixed(1)}/5 (${count} ratings)`);
    } catch (err) {
      setRatingSummary("Rating summary unavailable");
    }
  };

  useEffect(() => {
    fetchRatingSummary();
  }, []);

  const submitRating = async (e) => {
    e.preventDefault();
    if (!rating) {
      setSubmitted("Please select a star rating");
      return;
    }
    try {
      await API.post("/ratings", {
        score: rating,
        feedback: message,
        userName,
        userRole: String(userRole || "").toLowerCase(),
      });
      setSubmitted("Thank you for your feedback");
      setRating(0);
      setMessage("");
      await fetchRatingSummary();
    } catch (err) {
      setSubmitted(err.response?.data?.message || "Failed to submit rating");
    }
  };

  return (
    <>
     

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

          {!isHospital && (
            <div className="mt-4">
              {!isRecipient && (
                <Link to="/donor-register" className="btn btn-danger btn-lg mx-2">
                  Become a Donor
                </Link>
              )}
              {!isDonor && (
                <Link to="/request-blood" className="btn btn-warning">
                  Request Blood
                </Link>
              )}
            </div>
          )}
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

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-wrap">
          <h2>About Us</h2>
          <p>
            Blood Donation System is a platform built to connect donors,
            recipients, hospitals, and blood banks in one reliable network.
            Our goal is to make blood availability fast, transparent, and easy
            to manage for everyone involved.
          </p>
          <p>
            We support safe donor registration, urgent request coordination, and
            better communication between healthcare organizations and the
            community. By improving how requests and donor information are
            handled, the system helps save time during critical situations.
          </p>
          <p>
            This website is designed to reduce delays in finding blood and to
            support life-saving action when every minute matters.
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="features-section">
        <div className="features-wrap">
          <h2>Core Features</h2>
          <p className="features-subtitle">
            One dashboard, every workflow: donors, requests, inventory,
            scheduling, and approvals.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Live Inventory</h3>
              <p>Track blood stock in real time.</p>
              <Link to="/inventory" className="feature-btn">
                Explore
              </Link>
            </div>
            {!isRecipient && !isHospital && (
              <div className="feature-card">
                <h3>Appointment Scheduling</h3>
                <p>Schedule donation appointments.</p>
                <Link to="/appointments" className="feature-btn">
                  Explore
                </Link>
              </div>
            )}
            {!isRecipient && !isHospital && (
              <div className="feature-card">
                <h3>Find Donors</h3>
                <p>Search donors by blood group and location.</p>
                <Link to="/search-donor" className="feature-btn">
                  Explore
                </Link>
              </div>
            )}
            {isAdmin && (
              <div className="feature-card">
                <h3>Admin Panel</h3>
                <p>Manage donors, recipients, hospitals, and reports.</p>
                <Link to="/admin-login" className="feature-btn">
                  Explore
                </Link>
              </div>
            )}
            {(isHospital || isAdmin) && (
              <div className="feature-card">
                <h3>Hospital Dashboard</h3>
                <p>Manage inventory and fulfill requests.</p>
                <Link to="/hospital" className="feature-btn">
                  Explore
                </Link>
              </div>
            )}
            <div className="feature-card">
              <h3>Reports &amp; Analytics</h3>
              <p>Monitor donation trends and availability.</p>
              <Link to="/analytics" className="feature-btn">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rating-section">
        <div className="rating-wrap">
          <h2>Rate This Website</h2>
          <p className="rating-subtitle">Your rating helps us improve the platform.</p>
          <p className="rating-summary">{ratingSummary}</p>

          <form onSubmit={submitRating}>
            <div className="stars-row" role="radiogroup" aria-label="Website rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${rating >= star ? "active" : ""}`}
                  onClick={() => setRating(star)}
                  aria-label={`${star} star`}
                >
                  &#9733;
                </button>
              ))}
            </div>

            <textarea
              className="rating-input"
              placeholder="Optional feedback"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
            />

            <button type="submit" className="rating-submit">
              Submit Rating
            </button>
          </form>

          {submitted && <p className="rating-feedback">{submitted}</p>}
        </div>
      </section>

      <section className="contact-message-section">
        <div className="contact-message-wrap">
          <h2>DROP US A MESSAGE</h2>
          <p>
            If you have queries, support requests, or collaboration ideas,
            please write to us at:
          </p>
          <p className="contact-email">contact@blooddonationsystem.org</p>
          <p>
            Please include your <strong>Name</strong>, <strong>Email</strong>,
            <strong> Contact Number</strong>, and <strong>City</strong> in your
            message.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
