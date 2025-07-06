import React from 'react';
import "./Dashboard.css";
import Sidebar from './Sidebar';
import SensorChart from './SensorChart.tsx';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <h1>Real Time Environmental Dashboard</h1>
        <div className="chart-container">
          <SensorChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;