/* eslint-disable react-refresh/only-export-components */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { cities } from "../../dummy-data/city";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

const labels = ["Amsterdam", "Athens", "Barcelona", "Beijing", "Berlin"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Max. Temp.",
      data: cities.map((city) => city.maxT),
      borderColor: "#d3869b",
      backgroundColor: "#d3869baa",
    },
    {
      fill: true,
      label: "Min. Temp",
      data: cities.map((city) => city.minT),
      borderColor: "#8f3f71",
      backgroundColor: "#8f3f71aa",
    },
  ],
};

export default function Chart() {
  return <Line options={options} data={data} />;
}
