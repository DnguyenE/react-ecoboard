import React from "react";
import "./Sidebar.css";
import logo from "../images/react-logo.png";
import { SidebarData } from "./SidebarData";

function Sidebar () {
  return (
    <div className="sidebar-box">
      <div className="logo">
        <img src={logo} alt="React Logo" className="logo-img" />
        <h1>EcoBoard</h1>
      </div>
      <div className="menu">
        <ul>
          {SidebarData.map((item, index) => (
            <li key={index} className="menu-item">
              <a href={item.path}>
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
