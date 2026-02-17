import React, { useEffect, useState } from "react";
import api from "../services/api";

const BloodStock = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    const res = await api.get("/inventory");
    setStock(res.data);
  };

  return (
    <div>
      <h2>Blood Stock Reports</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Units Available</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((s) => (
            <tr key={s._id}>
              <td>{s.bloodGroup}</td>
              <td>{s.units}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodStock;