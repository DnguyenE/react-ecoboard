import React from 'react';
import "./Dashboard.css";
import SensorChart from './SensorChart.tsx';
import logo from "../images/react-logo.png";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="main-content">
        <div className="logo">
                <img src={logo} alt="EcoBoard Logo" className="logo-img" />
                <h1>EcoBoard</h1>
        </div>
        <div className="chart-container">
          <SensorChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;