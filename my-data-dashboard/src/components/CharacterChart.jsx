import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CharacterChart = ({ characters }) => {
  if (!characters || characters.length === 0) {
    return <p>Loading chart data...</p>;
  }

  const data = {
    labels: characters.map((character) => character.name),
    datasets: [
      {
        label: "Comics Available",
        data: characters.map((character) => character.comics.available),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Stories Available",
        data: characters.map((character) => character.stories.available),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar data={data} />;
};

export default CharacterChart;
