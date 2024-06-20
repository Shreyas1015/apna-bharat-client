import React, { useEffect, useState } from "react";
import Header from "../Header";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";

const AdminUserManagement = () => {
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getAllUsersData = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/admin/getAllUsersData`,
          { decryptedUID }
        );

        if (res.status === 200) {
          setUserData(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsersData();
  }, [decryptedUID]);

  const handleDeleteUser = async (uid) => {
    try {
      const res = await axiosInstance.delete(
        `${process.env.REACT_APP_BASE_URL}/admin/deleteUser`,
        { data: { uid, decryptedUID } }
      );

      if (res.status === 200) {
        setUserData((prevUserData) =>
          prevUserData.filter((user) => user.uid !== uid)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header pageName="User Management" />
      <div className="container-fluid p-3 border border-dark border-1 rounded-5 mb-4 table-responsive">
        <table className="table table-bordered">
          <thead className="text-center">
            <tr>
              <th className="px-5">Sr No.</th>

              <th className="px-5">Name</th>
              <th className="px-5">Email</th>
              <th className="px-5">Phone Number</th>
              <th className="px-5">Date of Birth</th>
              <th className="px-5">Gender</th>
              <th className="px-5">Village</th>
              <th className="px-5">Taluka</th>
              <th className="px-5">District</th>
              <th className="px-5">State</th>
              <th className="px-5">Pincode</th>
              <th className="px-5">Aadhar Card Front</th>
              <th className="px-5">Aadhar Card Back</th>
              <th className="px-5">Profile Image</th>

              <th className="px-5">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {userData.map((user, index) => (
              <tr key={user.up_id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{new Date(user.dob).toDateString()}</td>
                <td>{user.gender}</td>
                <td>{user.village}</td>
                <td>{user.taluka}</td>
                <td>{user.district}</td>
                <td>{user.state}</td>
                <td>{user.pincode}</td>
                <td>
                  <a
                    href={user.aadharcardfront}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-outline-dark">View</button>
                  </a>
                </td>
                <td>
                  <a
                    href={user.aadharcardback}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-outline-dark">View</button>
                  </a>
                </td>
                <td>
                  {user.profile_img ? (
                    <a
                      href={user.profile_img}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn btn-outline-dark">View</button>
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user.uid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUserManagement;
