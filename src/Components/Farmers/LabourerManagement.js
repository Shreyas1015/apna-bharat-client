import React, { useEffect, useState } from "react";
import Header from "../Header";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";

const LabourerManagement = () => {
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [jobsData, setJobData] = useState([]);

  useEffect(() => {
    const fetchAppliedApplications = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/farmers/fetchFarmersAcceptedApplications`,
          { decryptedUID }
        );
        if (res.status === 200) {
          setJobData(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppliedApplications();
  }, [decryptedUID]);

  return (
    <>
      <Header pageName="Labourer Management" />
      <div className="container-fluid p-3 border mt-5 border-dark border-1 rounded-5">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="text-center">
              <tr>
                <th className="px-5">Sr No.</th>
                <th className="px-5">Job Title</th>
                <th className="px-5">Job Description</th>
                <th className="px-5">Start Date</th>
                <th className="px-5">End Date</th>
                <th className="px-5">Working Hours</th>
                <th className="px-5">Wage Salary</th>
                <th className="px-5">Labourer Name</th>
                <th className="px-5">Labourer Email</th>
                <th className="px-5">Labourer Phone No.</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {jobsData.map((job, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{job.jobtitle}</td>
                  <td>{job.jobdescription}</td>
                  <td>{new Date(job.startdate).toDateString()}</td>
                  <td>{new Date(job.enddate).toDateString()}</td>
                  <td>{job.workinghours} / Per Day</td>
                  <td>{job.wagesalary} / Per Day</td>
                  <td>{job.user_name}</td>
                  <td>{job.user_email}</td>
                  <td>{job.user_phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LabourerManagement;
