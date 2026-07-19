// pages/Dashboard.jsx
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-eyebrow">Dispatch Desk</p>
        <h2>Welcome Back</h2>
        <p>Your work orders are ready for review.</p>

        <Link to="/tasks">
          <button className="login-btn" style={{ marginTop: 22 }}>
            Go to Task Log
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;