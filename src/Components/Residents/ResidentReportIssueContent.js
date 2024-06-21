import React, { useState } from "react";
import Header from "../Header";
import axiosInstance from "../../API/axiosInstance";
import secureLocalStorage from "react-secure-storage";
import { IKContext, IKUpload } from "imagekitio-react";

const ResidentReportIssueContent = () => {
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [images, setImages] = useState("");
  const [formData, setFormData] = useState({
    residentName: "",
    contactInfo: "",
    address: "",
    issueType: "",
    issueDescription: "",
    issueLocation: "",
    issueDate: "",
    priorityLevel: "",
    additionalComments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullFormData = { ...formData, images };
      const res = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/resident/reportIssue`,
        { decryptedUID, fullFormData }
      );
      if (res.status === 200) {
        alert("Form submitted!");
        setFormData({
          residentName: "",
          contactInfo: "",
          address: "",
          issueType: "",
          issueDescription: "",
          issueLocation: "",
          issueDate: "",
          priorityLevel: "",
          additionalComments: "",
        });
        setImages("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const authenticator = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/farmers/drivers_document_auth`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;

      return { signature, expire, token };
    } catch (error) {
      console.error(`Authentication request failed: ${error.message}`);
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

  return (
    <div>
      <Header pageName="Report Issue" />
      <div className="container-fluid p-4 border border-dark rounded-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="residentName">
              Name:
            </label>
            <input
              className="form-control"
              type="text"
              id="residentName"
              name="residentName"
              value={formData.residentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="contactInfo">
              Contact Information:
            </label>
            <input
              className="form-control"
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="address">
              Address:
            </label>
            <input
              className="form-control"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="issueType">
              Type of Issue:
            </label>
            <select
              className="form-control"
              id="issueType"
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              required
            >
              <option>Select</option>
              <option value="Road Repair">Road Repair</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Street Light">Street Light</option>
              <option value="Garbage Collection">Garbage Collection</option>
              <option value="Noise Complaint">Noise Complaint</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="issueDescription">
              Description:
            </label>
            <textarea
              id="issueDescription"
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="issueLocation">
              Location of Issue:
            </label>
            <input
              className="form-control"
              type="text"
              id="issueLocation"
              name="issueLocation"
              value={formData.issueLocation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="issueDate">
              Date and Time:
            </label>
            <input
              className="form-control"
              type="datetime-local"
              id="issueDate"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Images</label>
            <IKContext
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticator={authenticator}
            >
              <IKUpload
                required
                className="form-control"
                fileName={`${decryptedUID}_residentReportIssue.jpg`}
                folder="Home/Tripto/passengers"
                tags={["tag1"]}
                useUniqueFileName={true}
                isPrivateFile={false}
                onSuccess={(r) => {
                  setImages(r.url || "");
                  alert("Uploaded");
                }}
                onError={(e) => console.log(e)}
              />
            </IKContext>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="priorityLevel">
              Priority Level:
            </label>
            <select
              id="priorityLevel"
              name="priorityLevel"
              value={formData.priorityLevel}
              onChange={handleChange}
              className="form-control"
            >
              <option>Select</option>
              <option value="Low">Low</option>
              <option value="Medium" selected>
                Medium
              </option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="additionalComments">
              Additional Comments:
            </label>
            <textarea
              id="additionalComments"
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-outline-dark">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResidentReportIssueContent;
