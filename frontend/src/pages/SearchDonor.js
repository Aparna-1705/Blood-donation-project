import React, { useState } from "react";
import API from "../services/api";

const SearchDonor = () => {
  const [bg, setBg] = useState("");
  const [donors, setDonors] = useState([]);

  const search = async () => {
    if (!bg) return alert("Please select blood group");

    try {
      const res = await API.get(`/donors/search/${bg}`);
      setDonors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      alert("Error fetching donors");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h3 style={styles.heading}>Search Blood Donors</h3>

          <div style={{ display: "flex", marginBottom: "12px" }}>
            <select style={styles.input} onChange={(e) => setBg(e.target.value)}>
              <option value="">Select Blood Group</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option>
              <option>O+</option><option>O-</option>
            </select>

            <button style={styles.searchBtn} onClick={search}>Search</button>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood</th>
                <th>Phone</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {donors.length > 0 ? (
                donors.map((d) => (
                  <tr key={d._id}>
                    <td>{d.name}</td>
                    <td>{d.bloodGroup}</td>
                    <td>{d.phone}</td>
                    <td>{d.city || d.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No donors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "25px",
    width: "650px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
  },
  heading: {
    textAlign: "center",
    color: "#c62828",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  searchBtn: {
    marginLeft: "10px",
    padding: "10px 20px",
    background: "#c62828",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default SearchDonor;
