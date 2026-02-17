import React, { useEffect, useState } from "react";
import API from "../services/api";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await API.get("/inventory");
      setInventory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-danger text-center mb-4">Blood Inventory</h3>

      <table className="table table-bordered table-striped">
        <thead className="table-danger">
          <tr>
            <th>Blood Group</th>
            <th>Units Available</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td>{item.bloodGroup}</td>
              <td>{item.units}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;