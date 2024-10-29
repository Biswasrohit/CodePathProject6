import React from "react";
import "../App.css";

const Dashboard = ({ totalCharacters }) => {
  return (
    <div className="dashboard">
      <div className="stat-box">
        <h3>{totalCharacters}</h3>
        <p>Total Characters</p>
      </div>
    </div>
  );
};

export default Dashboard;
