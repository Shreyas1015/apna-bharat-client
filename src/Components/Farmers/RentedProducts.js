import React, { useEffect, useState } from "react";
import Header from "../Header";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";
import toast from "react-hot-toast";

const RentedProducts = () => {
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    const fetchAppliedApplicationsForRentedProducts = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/farmers/fetchRentedProducts`,
          { decryptedUID }
        );
        if (res.status === 200) {
          setEquipmentData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppliedApplicationsForRentedProducts();
  }, [decryptedUID]);

  const handleReturnApplication = async (erId, requestId) => {
    try {
      const res = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/farmers/handleReturnApplication`,
        { erId, decryptedUID, requestId }
      );
      if (res.status === 200) {
        toast.success("Application accepted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  return (
    <>
      <Header pageName="Rented Equipments Data" />
      <div className="container-fluid p-3 border mt-5 border-dark border-1 rounded-5">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="text-center">
              <tr>
                <th className="px-5">Sr No.</th>
                <th className="px-5">Equipment Name</th>
                <th className="px-5">Equipment Rent</th>
                <th className="px-5">Requester Name</th>
                <th className="px-5">Requester Email</th>
                <th className="px-5">Requester Phone No.</th>
                <th className="px-5">Requester Profile Image</th>
                <th className="px-5">Requester AddharCard Front</th>
                <th className="px-5">Requester AddharCard Back</th>
                <th className="px-5">Request Date</th>
                <th className="px-5">Requester Village</th>
                <th className="px-5">Requester Taluka</th>
                <th className="px-5">Requester District</th>
                <th className="px-5">Requester State</th>
                <th className="px-5">Requester Pincode</th>
                <th className="px-5">Rented On</th>
                <th className="px-5">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {equipmentData.map((request, index) => (
                <tr key={index}>
                  <th scope="row">{request.request_id}</th>
                  <td>{request.equipment_name}</td>
                  <td>{request.rental_price}</td>
                  <td>{request.requester_name}</td>
                  <td>{request.requester_email}</td>
                  <td>{request.requester_phone}</td>
                  <td>
                    <a
                      href={request.requester_profile_img}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn btn-outline-dark"> View</button>
                    </a>
                  </td>
                  <td>
                    <a
                      href={request.requester_addharcard_front}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn btn-outline-dark">View</button>
                    </a>
                  </td>
                  <td>
                    <a
                      href={request.requester_addharcard_back}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn btn-outline-dark">View</button>
                    </a>
                  </td>
                  <td>{new Date(request.request_date).toDateString()}</td>
                  <td>{request.requester_village}</td>
                  <td>{request.requester_taluka}</td>
                  <td>{request.requester_district}</td>
                  <td>{request.requester_state}</td>
                  <td>{request.requester_pincode}</td>
                  <td>{new Date(request.rented_date).toDateString()}</td>
                  <td>
                    {request.availability === 1 ? (
                      <>
                        <button
                          className="btn btn-danger my-2 btn-sm"
                          onClick={() =>
                            handleReturnApplication(
                              request.er_id,
                              request.request_id
                            )
                          }
                        >
                          Returned
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-danger my-2 btn-sm" disabled>
                          Returned
                        </button>
                      </>
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

export default RentedProducts;
