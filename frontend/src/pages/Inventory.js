import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Inventory.css";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await API.get("/inventory");
      setInventory(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="inv-page">
      <div className="inv-card">
        <div className="inv-header">
          <h2>Blood Inventory</h2>
          <span className="inv-count">{inventory.length} Groups</span>
        </div>

        {inventory.length === 0 ? (
          <p className="inv-info">No inventory data found.</p>
        ) : (
          <div className="inv-table-wrap">
            <table className="inv-table">
              <thead>
                <tr>
                  <th>Blood Group</th>
                  <th>Units Available</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <span className="inv-badge">{item.bloodGroup}</span>
                    </td>
                    <td>{item.units}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
