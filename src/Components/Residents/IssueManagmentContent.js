import React, { useEffect, useState } from "react";
import Header from "../Header";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";

const IssueManagmentContent = () => {
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [issueData, setIssueData] = useState([]);
  const [filteredIssueData, setFilteredIssueData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    issueType: [],
    issueDate: "",
    priorityLevel: [],
    status: [],
  });

  useEffect(() => {
    const getIssueData = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/resident/getIndividualIssueData`,
          { decryptedUID }
        );
        if (res.status === 200) {
          setIssueData(res.data);
          setFilteredIssueData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getIssueData();
  }, [decryptedUID]);

  const handleFilter = () => {
    let filteredData = issueData;

    if (filterOptions.issueType.length > 0) {
      filteredData = filteredData.filter((issue) =>
        filterOptions.issueType.includes(issue.issue_type)
      );
    }
    if (filterOptions.issueDate) {
      filteredData = filteredData.filter(
        (issue) => issue.issue_date === filterOptions.issueDate
      );
    }
    if (filterOptions.priorityLevel.length > 0) {
      filteredData = filteredData.filter((issue) =>
        filterOptions.priorityLevel.includes(issue.priority_level)
      );
    }
    if (filterOptions.status.length > 0) {
      filteredData = filteredData.filter((issue) =>
        filterOptions.status.includes(issue.status)
      );
    }

    setFilteredIssueData(filteredData);
  };

  const clearFilter = () => {
    setFilterOptions({
      issueType: [],
      issueDate: "",
      priorityLevel: [],
      status: [],
    });
    setFilteredIssueData(issueData);
  };

  return (
    <>
      <Header pageName="Issues Management" />
      <div className="row mb-5">
        <div className="col-lg-3">
          <label className="form-label">Filter by Issue Type:</label>
          <select
            className="form-control"
            value={filterOptions.issueType}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                issueType: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              })
            }
          >
            <option value="Street Light">Street Light</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Garbage Collection">Garbage Collection</option>
            <option value="Other">Other</option>
            <option value="Noise Complaint">Noise Complaint</option>
          </select>
        </div>
        <div className="col-lg-3">
          <label className="form-label">Filter by Issue Date:</label>
          <input
            className="form-control"
            type="date"
            value={filterOptions.issueDate}
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, issueDate: e.target.value })
            }
          />
        </div>
        <div className="col-lg-3">
          <label className="form-label">Filter by Priority Level:</label>
          <select
            className="form-control"
            value={filterOptions.priorityLevel}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                priorityLevel: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              })
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="col-lg-3">
          <label className="form-label">Filter by Status:</label>
          <select
            className="form-control"
            value={filterOptions.status}
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                status: Array.from(e.target.selectedOptions, (option) =>
                  parseInt(option.value)
                ),
              })
            }
          >
            <option value={0}>Pending</option>
            <option value={1}>Applied</option>
            <option value={2}>Resolved</option>
            <option value={3}>Closed</option>
          </select>
        </div>
        <div className="row">
          <div className="col-lg-10">
            <button
              onClick={handleFilter}
              className="form-control mt-4 btn btn-outline-dark"
            >
              Apply Filter
            </button>
          </div>
          <div className="col-lg-2">
            <button
              onClick={clearFilter}
              className="form-control mt-4 btn btn-outline-dark"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid p-3 border border-dark border-1 rounded-5 mb-4 table-responsive">
        <table className="table table-bordered ">
          <thead className="text-center">
            <tr>
              <th className="px-5">Sr No.</th>
              <th className="px-5">Resident Name</th>
              <th className="px-5">Contact Info</th>
              <th className="px-5">Address</th>
              <th className="px-5">Issue Type</th>
              <th className="px-5">Issue Description</th>
              <th className="px-5">Issue Location</th>
              <th className="px-5">Issue Date</th>
              <th className="px-5">Images</th>
              <th className="px-5">Priority Level</th>
              <th className="px-5">Additional Comments</th>
              <th className="px-5">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredIssueData.map((issue, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{issue.resident_name}</td>
                <td>{issue.contact_info}</td>
                <td>{issue.address}</td>
                <td>{issue.issue_type}</td>
                <td>{issue.issue_description}</td>
                <td>{issue.issue_location}</td>
                <td>{new Date(issue.issue_date).toDateString()}</td>
                <td>
                  <a
                    href={issue.images}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-outline-dark"> View</button>
                  </a>
                </td>

                <td>{issue.priority_level}</td>
                <td>{issue.additional_comments}</td>

                <td>
                  {issue.status === 0
                    ? "Pending"
                    : issue.status === 1
                    ? "Applied"
                    : issue.status === 2
                    ? "Resolved"
                    : "Closed"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default IssueManagmentContent;
