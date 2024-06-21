import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [doughnutData, setDoughnutData] = useState([]);
  const decryptedUID = secureLocalStorage.getItem("uid");

  useEffect(() => {
    const getGroupByPriority = async () => {
      try {
        const response = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/admin/getGroupByPriority`,
          { decryptedUID }
        );
        setDoughnutData(response.data.issues);
      } catch (error) {
        console.error("Error fetching Pie Chart data:", error);
      }
    };

    getGroupByPriority();
  }, [decryptedUID]);

  const data = {
    labels: doughnutData.map((item) => item.priority_level),
    datasets: [
      {
        label: "Issue Priority Distribution",
        data: doughnutData.map((item) => item.issue_count),
        backgroundColor: [
          "rgba(0, 100, 100, 0.7)",
          "rgba(150, 130, 0, 0.7)",
          "rgba(150, 0, 30, 0.7)",
          "rgba(30, 90, 160, 0.7)",
          "rgba(90, 30, 120, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          fontSize: 26,
        },
      },
    },
  };
  return (
    <>
      <div style={{ height: "calc(100% - 40px)" }}>
        <Doughnut data={data} options={options} height={150} />
      </div>
    </>
  );
};

export default DoughnutChart;
