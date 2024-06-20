import React, { useEffect, useState } from "react";
import Header from "../Header";
import axiosInstance from "../../API/axiosInstance";
import secureLocalStorage from "react-secure-storage";

const LaboursEquipmentRenalsContent = () => {
  const uid = localStorage.getItem("@secure.n.uid");
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllRentalEquipmentApplications = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/farmers/getAllRentalEquipmentApplications`,
          { decryptedUID }
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllRentalEquipmentApplications();
  }, [decryptedUID]);

  const applyForProduct = async (er_id) => {
    try {
      const res = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/farmers/applyForRentalEquipment`,
        { er_id, decryptedUID }
      );
      if (res.status === 200) {
        alert("Applied successfully!");
      }
    } catch (error) {
      console.log(error);
      alert("Error applying for product.");
    }
  };

  return (
    <>
      <Header pageName="Product Sales" />
      <div className="container mt-4">
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-lg-12 my-4">
              <div className="card rounded-4 shadow-sm">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <h5 className="card-title text-primary">
                        {product.equipment_name}
                      </h5>
                      <p className="text-muted">
                        <small>
                          Posted on:{" "}
                          {new Date(product.created_at).toLocaleDateString()}
                        </small>
                      </p>
                    </div>
                  </div>

                  <hr />
                  <p className="card-text">{product.equipment_description}</p>
                  <p>
                    <strong>Rental Price:</strong> {product.rental_price}
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Owner:</strong> {product.owner_name}
                      </p>
                      <p>
                        <strong>Contact:</strong> {product.contact_number}
                      </p>
                      <p>
                        <strong>Email:</strong> {product.contact_email}
                      </p>
                      <p>
                        <strong>Payment Terms:</strong> {product.payment_terms}
                      </p>
                      <p>
                        <strong>Usage Restrictions:</strong>{" "}
                        {product.usage_restrictions}
                      </p>
                      <p>
                        <strong>Pickup/Delivery Options:</strong>{" "}
                        {product.pickup_delivery_options}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Additional Accessories:</strong>{" "}
                        {product.additional_accessories}
                      </p>
                      <p>
                        <strong>Insurance Details:</strong>{" "}
                        {product.insurance_details}
                      </p>
                      <p>
                        <strong>Terms & Conditions:</strong>{" "}
                        {product.terms_conditions}
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <a
                        href={product.aadhar_card_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="btn btn-outline-primary mt-2">
                          View Aadhar Card
                        </button>
                      </a>
                    </div>
                    <div className="col-md-6">
                      <a
                        href={product.kisan_credit_card_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="btn btn-outline-primary mt-2">
                          View Kisan Credit Card
                        </button>
                      </a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <button
                        className="btn btn-primary mt-3 form-control"
                        onClick={() => applyForProduct(product.er_id)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LaboursEquipmentRenalsContent;
