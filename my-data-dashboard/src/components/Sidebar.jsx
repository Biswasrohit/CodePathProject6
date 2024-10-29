import React from "react";
import "../App.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>MarvelDash</h2>
      <nav>
        <ul>
          <li>🏠 Dashboard</li>
          <li>🔍 Search</li>
          <li>ℹ️ About</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
