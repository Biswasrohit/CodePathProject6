import React from "react";
import CharacterChart from "./CharacterChart";
import "../App.css";

const Dashboard = ({ totalCharacters, characters }) => {
  return (
    <div className="dashboard">
      <div className="stat-box">
        <h3>{totalCharacters}</h3>
        <p>Total Characters</p>
      </div>
      {/* Pass characters to CharacterChart */}
      <CharacterChart characters={characters} />
    </div>
  );
};

export default Dashboard;
