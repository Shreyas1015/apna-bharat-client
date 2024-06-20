import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";
import Header from "../Header";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";

const EquipmentRentalForm = () => {
  const navigate = useNavigate();
  const uid = localStorage.getItem("@secure.n.uid");
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [isAadharVisible, setIsAadharVisible] = useState(false);
  const [isKisanCreditVisible, setIsKisanCreditVisible] = useState(false);
  const [aadharCard, setAadharCard] = useState("");
  const [kisanCreditCard, setKisanCreditCard] = useState("");
  const [formData, setFormData] = useState({
    equipmentName: "",
    equipmentDescription: "",
    equipmentCondition: "",
    rentalLocation: "",
    rentalPrice: "",
    paymentTerms: "",
    usageRestrictions: "",
    ownerName: "",
    contactNumber: "",
    contactEmail: "",
    pickupDeliveryOptions: "",
    additionalAccessories: "",
    insuranceDetails: "",
    termsConditions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const getFarmerDetails = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/farmers/fetchFarmersProfileData`,
          { decryptedUID }
        );
        setFormData({
          rentalLocation:
            res.data.village +
            ", " +
            res.data.taluka +
            ", " +
            res.data.district +
            ", " +
            res.data.state +
            ", " +
            res.data.pincode,
          ownerName: res.data.name,
          contactNumber: res.data.phone_number,
          contactEmail: res.data.email,
        });
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    };

    getFarmerDetails();
  }, [decryptedUID]);

  const authenticator = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/user/drivers_document_auth`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Authentication response error text:", errorText);
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;

      return { signature, expire, token };
    } catch (error) {
      console.error("Authentication request failed:", error);
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullFormData = { ...formData, aadharCard, kisanCreditCard };
      const res = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/farmers/EquipmentRentalForm`,
        { fullFormData, decryptedUID }
      );
      if (res.status === 200) {
        alert("Equipment Posted Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const BackToLogin = () => {
    navigate("/");
  };

  const handleViewButtonClick = () => {
    setIsAadharVisible(!isAadharVisible);
    setIsKisanCreditVisible(!isKisanCreditVisible);
  };

  if (!uid) {
    return (
      <>
        <div className="container text-center fw-bold">
          <h2>INVALID URL. Please provide a valid UID.</h2>
          <button onClick={BackToLogin} className="btn blue-buttons">
            Back to Login
          </button>
        </div>
      </>
    );
  }

  const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

  return (
    <>
      <Header pageName="Equipment Rental Form" />
      <div className="container mt-5 p-5 border border-dark rounded-5 ">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="equipmentName" className="form-label">
              Equipment Name
            </label>
            <input
              required
              type="text"
              id="equipmentName"
              className="form-control"
              name="equipmentName"
              value={formData.equipmentName || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="equipmentCondition" className="form-label">
              Equipment Condition
            </label>
            <input
              required
              type="text"
              id="equipmentCondition"
              className="form-control"
              name="equipmentCondition"
              value={formData.equipmentCondition || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="equipmentDescription" className="form-label">
              Equipment Description
            </label>
            <textarea
              required
              id="equipmentDescription"
              className="form-control"
              name="equipmentDescription"
              value={formData.equipmentDescription || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="rentalLocation" className="form-label">
              Rental Location
            </label>
            <input
              required
              type="text"
              id="rentalLocation"
              className="form-control"
              name="rentalLocation"
              value={formData.rentalLocation || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="rentalPrice" className="form-label">
              Rental Price
            </label>
            <input
              required
              type="number"
              id="rentalPrice"
              className="form-control"
              name="rentalPrice"
              value={formData.rentalPrice || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="paymentTerms" className="form-label">
              Payment Terms
            </label>
            <input
              required
              type="text"
              id="paymentTerms"
              className="form-control"
              name="paymentTerms"
              value={formData.paymentTerms || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="usageRestrictions" className="form-label">
              Usage Restrictions
            </label>
            <input
              type="text"
              id="usageRestrictions"
              className="form-control"
              name="usageRestrictions"
              value={formData.usageRestrictions || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="ownerName" className="form-label">
              Owner Name
            </label>
            <input
              required
              type="text"
              id="ownerName"
              className="form-control"
              name="ownerName"
              value={formData.ownerName || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number
            </label>
            <input
              required
              type="text"
              id="contactNumber"
              className="form-control"
              name="contactNumber"
              value={formData.contactNumber || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="contactEmail" className="form-label">
              Contact Email
            </label>
            <input
              required
              type="email"
              id="contactEmail"
              className="form-control"
              name="contactEmail"
              value={formData.contactEmail || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="addharCard" className="form-label">
              Aadhar Card
            </label>
            <IKContext
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticator={authenticator}
            >
              <IKUpload
                fileName={`${formData.ownerName}_aadharCardFront.jpg`}
                className="form-control"
                tags={["aadhar"]}
                folder={"/aadharCards"}
                onSuccess={(result) => {
                  setAadharCard(result.url);
                  alert("Uploaded");
                }}
                onError={(e) => console.log(e)}
              />
              {aadharCard && (
                <>
                  <button
                    onClick={handleViewButtonClick}
                    className="view-button"
                    type="button"
                  >
                    View
                  </button>
                  {isAadharVisible && (
                    <IKImage
                      src={aadharCard}
                      className="form-control mt-3"
                      alt="aadhar card front image"
                      transformation={[
                        {
                          height: 200,
                          width: 200,
                        },
                      ]}
                    />
                  )}
                </>
              )}
            </IKContext>
          </div>
          <div className="col-md-6">
            <label htmlFor="kisanCreditCard" className="form-label">
              Kisan Credit Card
            </label>
            <IKContext
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticator={authenticator}
            >
              <IKUpload
                fileName={`${formData.ownerName}_kisanCreditCardFront.jpg`}
                className="form-control"
                tags={["kisanCredit"]}
                folder={"/kisanCreditCards"}
                onSuccess={(result) => {
                  setKisanCreditCard(result.url);
                  alert("Uploaded");
                }}
                onError={(e) => console.log(e)}
              />
              {kisanCreditCard && (
                <>
                  <button
                    onClick={handleViewButtonClick}
                    className="view-button"
                    type="button"
                  >
                    View
                  </button>
                  {isKisanCreditVisible && (
                    <IKImage
                      src={kisanCreditCard}
                      className="form-control mt-3"
                      alt="kisan credit card front image"
                      transformation={[
                        {
                          height: 200,
                          width: 200,
                        },
                      ]}
                    />
                  )}
                </>
              )}
            </IKContext>
          </div>
          <div className="col-md-6">
            <label htmlFor="pickupDeliveryOptions" className="form-label">
              Pickup/Delivery Options
            </label>
            <input
              required
              type="text"
              id="pickupDeliveryOptions"
              className="form-control"
              name="pickupDeliveryOptions"
              value={formData.pickupDeliveryOptions || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="additionalAccessories" className="form-label">
              Additional Accessories
            </label>
            <textarea
              required
              id="additionalAccessories"
              className="form-control"
              name="additionalAccessories"
              value={formData.additionalAccessories || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="insuranceDetails" className="form-label">
              Insurance Details
            </label>
            <textarea
              required
              id="insuranceDetails"
              className="form-control"
              name="insuranceDetails"
              value={formData.insuranceDetails || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="termsConditions" className="form-label">
              Terms and Conditions
            </label>
            <textarea
              required
              id="termsConditions"
              className="form-control"
              name="termsConditions"
              value={formData.termsConditions || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EquipmentRentalForm;
