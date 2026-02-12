import { Link } from "react-router-dom";

function DashboardCard({ title, link }) {
  return (
    <div className="col-md-3 mb-3">
      <div className="card shadow text-center p-3">
        <h5>{title}</h5>
        <Link to={link} className="btn btn-danger mt-2">
          Open
        </Link>
      </div>
    </div>
  );
}

export default DashboardCard;