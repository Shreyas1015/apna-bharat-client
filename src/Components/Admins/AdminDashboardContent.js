import React, { useEffect, useState } from "react";
import Header from "../Header";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";
import LineGraph from "./LineGraph";
import RecentIssues from "./RecentIssues";
import PieChart from "./PieChart";
import BarGraph from "./BarGraph";
import DoughnutChart from "./Doughnut";
import { Link } from "react-router-dom";

const AdminDashboardContent = () => {
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [totalIssues, setTotalIssues] = useState(0);
  const [resolvedIssues, setResolvedIssues] = useState(0);
  const [pendingIssues, setPendingIssues] = useState(0);

  useEffect(() => {
    const getTotalIssuesCount = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/admin/getTotalIssuesCount`,
          { decryptedUID }
        );
        if (res.status === 200) {
          setTotalIssues(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const getPendingIssuesCount = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/admin/getPendingIssuesCount`,
          { decryptedUID }
        );
        if (res.status === 200) {
          setPendingIssues(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const getResolvedIssuesCount = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/admin/getResolvedIssuesCount`,
          { decryptedUID }
        );
        if (res.status === 200) {
          setResolvedIssues(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getPendingIssuesCount();
    getTotalIssuesCount();
    getResolvedIssuesCount();
  }, [decryptedUID]);
  return (
    <>
      <Header pageName="Dashboard" />
      <div className="container counts mb-3">
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <strong>Total No. Of Issues</strong>
              </div>
              <div className="card-body">
                <p>Count: {totalIssues}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <strong>Pending Issues</strong>
              </div>
              <div className="card-body">
                <p>Count: {pendingIssues}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <strong>Resolved Issues</strong>
              </div>
              <div className="card-body">
                <p>Count: {resolvedIssues}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container div-2 mb-3">
        <div className="row">
          <div className="col-lg-8">
            <div className="card" style={{ height: "40vh" }}>
              <LineGraph />
            </div>
          </div>
          <div className="col-lg-4">
            <Link
              to={`/admin-issue-management`}
              className="text-decoration-none"
            >
              <div
                className="card"
                style={{ height: "40vh", overflowY: "scroll" }}
              >
                <RecentIssues />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container div-3">
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <strong>Issues Distribution</strong>
              </div>
              <div className="card-body">
                <PieChart />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <strong>Issue Status Distribution</strong>
              </div>
              <div className="card-body">
                <BarGraph />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <strong>Issue Priority Distribution</strong>
              </div>
              <div className="card-body">
                <DoughnutChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardContent;
