import React from "react";
import { Link } from "react-router-dom";
import "./CoreFeatures.css";

const CoreFeatures = () => {
  const storedUser = localStorage.getItem("user");
  let userRole = "";
  try {
    userRole = JSON.parse(storedUser || "{}")?.role || "";
  } catch (e) {
    userRole = "";
  }

  const isDonor = String(userRole).toLowerCase() === "donor";
  const isHospital = String(userRole).toLowerCase() === "hospital";

  return (
    <section className="feature-section">
      <div className="feature-wrap">
        <div className="feature-header">
          <h2>Core Features</h2>
          <p>
            One dashboard, every workflow: donors, requests, inventory,
            scheduling, and approvals.
          </p>
        </div>

        <div className="feature-grid">
          <Feature
            title="Become a Donor"
            desc="Join as a donor and manage your donation profile."
            link="/donor-register"
            tone="donor"
            cta="Become a Donor"
          />
          <Feature
            title="Request Blood"
            desc="Submit a blood request quickly based on urgency."
            link="/blood-request"
            tone="request"
            cta="Request Blood"
          />
          <Feature
            title="Live Inventory"
            desc="Track blood stock in real time."
            link="/inventory"
            tone="inventory"
          />
          <Feature
            title="Appointment Scheduling"
            desc="Schedule donation appointments."
            link="/appointments"
            tone="appointment"
          />
          <Feature
            title="Find Donors"
            desc="Search donors by blood group and location."
            link="/search-donor"
            tone="find"
          />
          {!isHospital && (
            <Feature
              title="Admin Panel"
              desc="Manage donors, recipients, hospitals, and reports."
              link="/admin-login"
              tone="admin"
            />
          )}
          {!isDonor && (
            <Feature
              title="Hospital Dashboard"
              desc="Manage inventory and fulfill requests."
              link="/hospital-dashboard"
              tone="hospital"
            />
          )}
          <Feature
            title="Reports & Analytics"
            desc="Monitor donation trends and availability."
            link="/analytics"
            tone="analytics"
          />
        </div>
      </div>
    </section>
  );
};

const Feature = ({ title, desc, link, tone, cta = "Explore" }) => (
  <div className={`feature-card ${tone}`}>
    <div className="feature-card-body">
      <h3>{title}</h3>
      <p>{desc}</p>
      <Link to={link} className="feature-btn">
        {cta}
      </Link>
    </div>
  </div>
);

export default CoreFeatures;
