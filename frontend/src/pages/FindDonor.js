import React, { useEffect, useState } from "react";
import API from "../services/api";

const FindDonor = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await API.get("/donor");
        setDonors(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load donors");
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading donors...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-4">
      <h3 className="text-danger text-center mb-4">Available Blood Donors</h3>

      {donors.length === 0 && (
        <p className="text-center">No donors found</p>
      )}

      <div className="row">
        {donors.map((d) => (
          <div key={d._id} className="col-md-4 mb-3">
            <div className="card shadow p-3 h-100">
              <h5 className="text-primary">{d.name}</h5>
              <p><strong>Blood Group:</strong> {d.bloodGroup}</p>
              <p><strong>Phone:</strong> {d.phone}</p>
              <p><strong>Location:</strong> {d.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindDonor;