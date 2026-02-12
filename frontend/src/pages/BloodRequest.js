import axios from "axios";
import { useState } from "react";

function BloodRequest() {
  const [data, setData] = useState({});

  const submit = async () => {
    await axios.post("http://localhost:5000/api/request/create", data);
    alert("Request Submitted");
  };

  return (
    <div>
      <h2>Emergency Blood Request</h2>
      <input placeholder="Patient Name" onChange={e => setData({...data, patientName: e.target.value})}/>
      <input placeholder="Blood Group" onChange={e => setData({...data, bloodGroup: e.target.value})}/>
      <input placeholder="Units Required" onChange={e => setData({...data, units: e.target.value})}/>
      <input placeholder="Urgency Level" onChange={e => setData({...data, urgency: e.target.value})}/>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default BloodRequest;