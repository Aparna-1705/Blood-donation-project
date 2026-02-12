import { useEffect, useState } from 'react';
import axios from 'axios';

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/inventory')
      .then(res => setInventory(res.data));
  }, []);

  return (
    <div className="container card">
      <h3>Blood Inventory</h3>
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>
            {item.bloodGroup} - {item.units} units ({item.hospitalName})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;