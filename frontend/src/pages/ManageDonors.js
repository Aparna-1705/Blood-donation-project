import React, { useEffect, useState } from "react";
import api from "../services/api";

const ManageDonors = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const res = await api.get("/donors");
    setDonors(res.data);
  };

  const deleteDonor = async (id) => {
    await api.delete(`/donors/${id}`);
    fetchDonors();
  };

  return (
    <div>
      <h2>Manage Donors</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.bloodGroup}</td>
              <td>{d.phone}</td>
              <td>
                <button onClick={() => deleteDonor(d._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDonors;