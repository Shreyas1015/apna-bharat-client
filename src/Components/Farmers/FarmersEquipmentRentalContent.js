import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";
import { IKContext, IKImage } from "imagekitio-react";

const FarmersEquipmentRentalContent = () => {
  const uid = localStorage.getItem("@secure.n.uid");
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [equipment, setEquipment] = useState([]);
  const [visibleImage, setVisibleImage] = useState({});

  useEffect(() => {
    const getAllFarmersJobApplications = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/farmers/getAllEquipmentForms`,
          { decryptedUID }
        );
        setEquipment(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFarmersJobApplications();
  }, [decryptedUID]);

  const deleteEquipment = async (erId) => {
    try {
      const res = await axiosInstance.delete(
        `${process.env.REACT_APP_BASE_URL}/farmers/deleteEquipmentForm`,
        {
          data: { decryptedUID, erId },
        }
      );

      setEquipment((prevEquipment) =>
        prevEquipment.filter((equip) => equip.er_id !== erId)
      );
      if (res.status === 200) {
        alert("Equipment Form deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete Equipment Form:", error);
    }
  };

  const authenticator = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/user/drivers_document_auth`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Authentication response error text:", errorText); // Log error text from the response
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();

      const { signature, expire, token } = data;

      return { signature, expire, token };
    } catch (error) {
      console.error("Authentication request failed:", error); // Log any errors caught
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const toggleImageVisibility = (jobId, imageType) => {
    const key = `${jobId}-${imageType}`;
    setVisibleImage((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

  return (
    <>
      <Header pageName="Equipment Rental" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 text-center">
            <Link to={`/farmers/equipment-rental-form?uid=${uid}`}>
              <button className="btn btn-outline-dark btn-lg form-control">
                Rent Form
              </button>
            </Link>
          </div>

          <div className="col-lg-4 text-center">
            <Link to={`/farmers/requested-applications-for-rent?uid=${uid}`}>
              <button className="btn btn-outline-dark btn-lg form-control">
                Applied Application
              </button>
            </Link>
          </div>

          <div className="col-lg-4 text-center">
            <Link to={`/farmers/rented-products-data?uid=${uid}`}>
              <button className="btn btn-outline-dark btn-lg form-control">
                Rented Products List
              </button>
            </Link>
          </div>
        </div>

        <h3 className="p-4 mt-5 border border-dark rounded-5">
          Your Equipment Applications On Rent
        </h3>
        <div className="container-fluid">
          <div className="row">
            {equipment.map((equip, index) => (
              <div key={index} className="col-lg-12 my-4">
                <div className="card rounded-4 shadow-sm">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <h5 className="card-title text-primary">
                          {equip.equipment_name}
                        </h5>
                      </div>
                      <div className="col-lg-6 text-end">
                        <button
                          className="btn border border-danger rounded-4 p-3 mx-5"
                          onClick={() => deleteEquipment(equip.er_id)}
                        >
                          <i
                            className="fa-solid fa-trash fa-xl"
                            style={{ color: "#df2a2a" }}
                          />
                        </button>
                      </div>
                    </div>

                    <hr />
                    <p className="card-text">{equip.equipment_description}</p>
                    <div className="row mb-3">
                      <div className="col-lg-6">
                        <p className="card-text">
                          Rental Price: {equip.rental_price}
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <p className="card-text">Owner: {equip.owner_name}</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-6">
                        <p className="card-text">
                          Contact: {equip.contact_number}
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <p className="card-text">
                          Email: {equip.contact_email}
                        </p>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <p>
                          <strong>Payment Terms:</strong> {equip.payment_terms}
                        </p>
                        <p>
                          <strong>Usage Restrictions:</strong>{" "}
                          {equip.usage_restrictions}
                        </p>
                        <p>
                          <strong>Pickup/Delivery Options:</strong>{" "}
                          {equip.pickup_delivery_options}
                        </p>
                        <p>
                          <strong>Additional Accessories:</strong>{" "}
                          {equip.additional_accessories}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong>Insurance Details:</strong>{" "}
                          {equip.insurance_details}
                        </p>
                        <p>
                          <strong>Terms & Conditions:</strong>{" "}
                          {equip.terms_conditions}
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <button
                          onClick={() =>
                            toggleImageVisibility(equip.er_id, "aadhar")
                          }
                          className="btn btn-outline-primary mt-2"
                        >
                          View Aadhar Card
                        </button>
                        {visibleImage[`${equip.er_id}-aadhar`] && (
                          <IKContext
                            publicKey={publicKey}
                            urlEndpoint={urlEndpoint}
                            authenticator={authenticator}
                          >
                            <div
                              className="image-preview-backdrop"
                              onClick={() =>
                                toggleImageVisibility(equip.er_id, "aadhar")
                              }
                            >
                              <div className="image-preview">
                                <IKImage
                                  src={equip.aadhar_card_url}
                                  alt="Aadhar Card"
                                  transformation={[
                                    { height: 300, width: 300, quality: 90 },
                                  ]}
                                />
                              </div>
                            </div>
                          </IKContext>
                        )}
                      </div>
                      <div className="col-md-6">
                        <IKContext
                          publicKey={publicKey}
                          urlEndpoint={urlEndpoint}
                          authenticator={authenticator}
                        >
                          <button
                            onClick={() =>
                              toggleImageVisibility(equip.er_id, "kisan")
                            }
                            className="view-button btn btn-outline-primary"
                            type="button"
                          >
                            View Kisan Credit Card
                          </button>
                          {visibleImage[`${equip.er_id}-kisan`] && (
                            <div
                              className="image-preview-backdrop"
                              onClick={() =>
                                toggleImageVisibility(equip.er_id, "kisan")
                              }
                            >
                              <div className="image-preview">
                                <IKImage
                                  src={equip.kisan_credit_card_url}
                                  alt="Kisan Credit Card"
                                  transformation={[
                                    { height: 300, width: 300, quality: 90 },
                                  ]}
                                />
                              </div>
                            </div>
                          )}
                        </IKContext>
                      </div>
                    </div>

                    {/* Edit Equipment Link */}
                    <a
                      href={`/farmers/edit-equipment-form?uid=${equip.uid}&edit=${equip.er_id}`}
                    >
                      <button className="btn btn-outline-primary my-3">
                        Edit Equipment
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmersEquipmentRentalContent;
