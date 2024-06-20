import React, { useEffect, useState } from "react";
import {
  Chart as CharJs,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axiosInstance from "../../API/axiosInstance";
import secureLocalStorage from "react-secure-storage";

CharJs.register(LineElement, PointElement, CategoryScale, LinearScale);

const LineGraph = () => {
  const [lineChartData, setLineChartData] = useState([]);
  const [timePeriod, setTimePeriod] = useState("daily");
  const decryptedUID = secureLocalStorage.getItem("uid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/admin/getReportedIssuesCountOverTime`,
          { decryptedUID, timePeriod }
        );
        console.log(response.data);
        setLineChartData(response.data);
      } catch (error) {
        console.error("Error fetching Line Chart data:", error);
      }
    };

    fetchData();
  }, [decryptedUID, timePeriod]);

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const data = {
    labels: lineChartData.map((item) => item.category_name),
    datasets: [
      {
        label: "Issues based on Types",
        data: lineChartData.map((item) => item.post_count),
        borderColor: "rgba(0, 100, 100, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Issues",
          fontSize: 16,
        },
      },
      x: {
        title: {
          display: true,
          text: "Issue Types",
          fontSize: 16,
        },
      },
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="card-header">
        <label htmlFor="timePeriod">Select Time Period: </label>
        <select
          id="timePeriod"
          value={timePeriod}
          onChange={handleTimePeriodChange}
          className="btn btn-outline-dark btn-sm mx-2"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div style={{ height: "calc(100% - 40px)" }}>
        <Line data={data} options={options} height={150} />
      </div>
    </div>
  );
};

export default LineGraph;
