import React from "react";
import "./Sidebar.css";
import logo from "./images/react-logo.png";

function Sidebar () {
  return (
    <div className="sidebar-box">
      <div className="logo">
        <img src={logo} alt="React Logo" className="logo-img" />
        <h1>EcoBoard</h1>
      </div>
      <div className="menu">
        
      </div>
    </div>
  );
}

export default Sidebar;
