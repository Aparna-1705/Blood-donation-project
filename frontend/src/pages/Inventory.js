import React, { useEffect, useState } from "react";
import API from "../services/api";

const Inventory = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const res = await API.get("/inventory");
    setStock(res.data);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-danger">Blood Inventory</h2>

      <table className="table table-bordered table-striped mt-4 text-center">
        <thead className="table-danger">
          <tr>
            <th>Blood Group</th>
            <th>Units Available</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item, i) => (
            <tr key={i}>
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