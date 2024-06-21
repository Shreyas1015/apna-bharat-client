import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";

const RecentIssues = () => {
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [recentIssues, setRecentIssues] = useState([]);

  useEffect(() => {
    const fetchRecentFeedbacks = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/admin/getRecentIssues`,
          { decryptedUID }
        );
        if (res.status === 200) {
          setRecentIssues(res.data.issues);
        }
      } catch (error) {
        console.error("Request Error : ", error.message);
      }
    };

    fetchRecentFeedbacks();
  }, [decryptedUID]);

  return (
    <>
      <div className="card-header">Recent Issues</div>
      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-root-margin="0px 0px -40%"
        data-bs-smooth-scroll="true"
        className="scrollspy-example px-3 py-1 rounded-2"
        tabIndex={0}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {recentIssues.map((issues, index) => (
            <li
              key={index}
              className="mb-3 text-blue border py-1 px-2 rounded-4 "
            >
              <div className="d-flex justify-content-between">
                <div>
                  <strong>{issues.issue_type}</strong>
                  <div>{new Date(issues.issue_date).toLocaleDateString()}</div>
                </div>
                <div>{issues.resident_name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RecentIssues;
