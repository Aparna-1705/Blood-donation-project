import React from "react";

const CampaignList = () => {
  const campaigns = [
    {
      _id: "1",
      title: "Blood Donation Camp - NSS Unit",
      date: "2026-03-10",
      location: "Govt College, Palakkad",
      organizer: "NSS",
    },
    {
      _id: "2",
      title: "Emergency Blood Drive",
      date: "2026-02-20",
      location: "District Hospital, Kozhikode",
      organizer: "Govt Hospital",
    },
    {
      _id: "3",
      title: "Mega Blood Donation Camp 2026",
      date: "2026-04-05",
      location: "Town Hall, Thrissur",
      organizer: "Life Savers NGO",
    },
  ];

  return (
    <div style={{ padding: "40px", fontFamily: "Segoe UI, sans-serif" }}>
      <h2>✅ Example Campaign UI Display (Admin / User View)</h2>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
        style={{ marginTop: "15px", borderCollapse: "collapse" }}
      >
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Organizer</th>
          </tr>
        </thead>

        <tbody>
          {campaigns.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{formatDate(item.date)}</td>
              <td>{item.location}</td>
              <td>{item.organizer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default CampaignList;