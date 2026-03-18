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

  const normalizedRole = String(userRole).toLowerCase();
  const isDonor = normalizedRole === "donor";
  const isHospital = normalizedRole === "hospital";
  const isAdmin = normalizedRole === "admin";
  const appointmentLink = isAdmin ? "/appointments-list" : "/appointments";

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
            link={appointmentLink}
            tone="appointment"
          />
          <Feature
            title="Find Donors"
            desc="Search donors by blood group and location."
            link="/search-donor"
            tone="find"
          />
          {!isHospital && !isAdmin && !isDonor && (
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
          {isAdmin && (
            <>
              <Feature
                title="Manage Donors"
                desc="Review and manage donor profiles."
                link="/manage-donors"
                tone="admin"
                cta="Manage"
              />
              <Feature
                title="Manage Recipients"
                desc="Review and manage recipient records."
                link="/manage-recipients"
                tone="admin"
                cta="Manage"
              />
              <Feature
                title="Blood Request Approvals"
                desc="Approve or reject incoming blood requests."
                link="/blood-request-approvals"
                tone="admin"
                cta="Review"
              />
              <Feature
                title="Blood Stock Reports"
                desc="View stock reports across blood groups."
                link="/blood-stock"
                tone="admin"
                cta="View Reports"
              />
              <Feature
                title="Donation Campaigns"
                desc="Plan and manage donation campaigns."
                link="/campaigns"
                tone="admin"
                cta="Manage"
              />
            </>
          )}
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
