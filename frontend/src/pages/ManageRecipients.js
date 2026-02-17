import React, { useEffect, useState } from "react";
import api from "../services/api";

const ManageRecipients = () => {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    const res = await api.get("/recipients");
    setRecipients(res.data);
  };

  return (
    <div>
      <h2>Manage Recipients</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.bloodGroup}</td>
              <td>{r.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRecipients;