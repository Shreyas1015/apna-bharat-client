import React, { useEffect, useState } from "react";
import Header from "../Header";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";
import toast from "react-hot-toast";

const AppliedApplications = () => {
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [jobsData, setJobData] = useState([]);

  useEffect(() => {
    const fetchAppliedApplications = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/farmers/fetchAppliedApplications`,
          { decryptedUID }
        );
        if (res.status === 200) {
          setJobData(res.data);
          
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppliedApplications();
  }, [decryptedUID]);

  const handleAcceptApplication = async (jobId, whoApplied) => {
    try {
      const res = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/farmers/acceptApplication`,
        { jobId, decryptedUID, whoApplied }
      );
      if (res.status === 200) {
        toast.success("Application accepted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handleRejectApplication = async (jobId, whoApplied) => {
    try {
      const res = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/farmers/rejectApplication`,
        { jobId, decryptedUID, whoApplied }
      );
      if (res.status === 200) {
        toast.success("Application rejected successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <>
      <Header pageName="Applied Applications" />

      <div className="container-fluid p-3 border mt-5 border-dark border-1 rounded-5">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="text-center">
              <tr>
                <th className="px-5">Sr No.</th>
                <th className="px-5">Job Title</th>
                <th className="px-5">Labourer Profile Image</th>
                <th className="px-5">Labourer Name</th>
                <th className="px-5">Labourer Email</th>
                <th className="px-5">Labourer Phone No.</th>
                <th className="px-5">Labourer Date of Birth</th>
                <th className="px-5">Labourer Gender</th>
                <th className="px-5">Labourer Aadhar Card Back</th>
                <th className="px-5">Labourer Aadhar Card Front</th>
                <th className="px-5">Labourer Experience</th>
                <th className="px-5">Labourer Qualification</th>
                <th className="px-5">Labourer Skills</th>
                <th className="px-5">Applied Date</th>
                <th className="px-5">Labourer Village</th>
                <th className="px-5">Labourer Taluka</th>
                <th className="px-5">Labourer District</th>
                <th className="px-5">Labourer State</th>
                <th className="px-5">Labourer Pincode</th>
                <th className="px-5">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {jobsData.map((job, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{job.jobtitle}</td>
                  <td>
                    <a
                      href={job.labourer_profile_img}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn btn-outline-dark m-3">View</button>
                    </a>
                  </td>
                  <td>{job.user_name}</td>
                  <td>{job.user_email}</td>
                  <td>{job.user_phone_number}</td>
                  <td>{new Date(job.labourer_dob).toDateString()}</td>
                  <td>{job.labourer_gender}</td>
                  <td>
                    <a
                      href={job.labourer_aadharcardback}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn btn-outline-dark m-3">View</button>
                    </a>
                  </td>
                  <td>
                    <a
                      href={job.labourer_aadharcardfront}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn btn-outline-dark m-3">View</button>
                    </a>
                  </td>
                  <td>{job.labourer_experience}</td>
                  <td>{job.labourer_qualification}</td>
                  <td>{job.labourer_skills}</td>
                  <td>{new Date(job.applied_date).toDateString()}</td>
                  <td>{job.labourer_village}</td>
                  <td>{job.labourer_taluka}</td>
                  <td>{job.labourer_district}</td>
                  <td>{job.labourer_state}</td>
                  <td>{job.labourer_pincode}</td>
                  <td>
                    {job.job_status === 0 || job.job_status === 1 ? (
                      <>
                        <div className="row">
                          <div className="col-lg-6">
                            <button
                              className="btn btn-success my-2 btn-sm"
                              onClick={() =>
                                handleAcceptApplication(
                                  job.jid,
                                  job.who_applied
                                )
                              }
                            >
                              Accept
                            </button>
                          </div>
                          <div className="col-lg-6">
                            <button
                              className="btn btn-danger my-2 btn-sm"
                              onClick={() =>
                                handleRejectApplication(
                                  job.jid,
                                  job.who_applied
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </>
                    ) : job.job_status === 2 ? (
                      <>
                        <button className="btn btn-success" disabled>
                          Accepted
                        </button>
                      </>
                    ) : job.job_status === 3 ? (
                      <>
                        <button className="btn btn-danger" disabled>
                          Rejected
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AppliedApplications;
