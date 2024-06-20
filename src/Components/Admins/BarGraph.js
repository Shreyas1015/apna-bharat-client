import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarGraph = () => {
  const [barGraphData, setBarGraphData] = useState([]);
  const decryptedUID = secureLocalStorage.getItem("uid");

  useEffect(() => {
    const getGroupBybarGraphData = async () => {
      try {
        const response = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/admin/getGroupBybarGraphData`,
          { decryptedUID }
        );
        setBarGraphData(response.data.issues);
        console.log(response.data.issues);
      } catch (error) {
        console.error("Error fetching bar graph data:", error);
      }
    };

    getGroupBybarGraphData();
  }, [decryptedUID]);

  const getColorForStatus = (status) => {
    switch (status) {
      case "Open":
        return "rgba(255, 99, 132, 0.7)";
      case "In Progress":
        return "rgba(54, 162, 235, 0.7)";
      case "Resolved":
        return "rgba(75, 192, 192, 0.7)";
      case "Closed":
        return "rgba(153, 102, 255, 0.7)";
      default:
        return "rgba(255, 159, 64, 0.7)";
    }
  };

  const data = {
    labels: barGraphData.map((item) => item.status),
    datasets: [
      {
        label: "Issue Status Distribution",
        data: barGraphData.map((item) => item.issue_count),
        backgroundColor: barGraphData.map((item) =>
          getColorForStatus(item.status)
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 12,
      },
    },
  };

  return (
    <>
      <div style={{ height: "calc(100% - 40px)" }}>
        <Bar data={data} options={options} height={150} />
      </div>
    </>
  );
};

export default BarGraph;
