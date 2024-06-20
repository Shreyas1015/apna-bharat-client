import React from "react";
import AdminUserManagement from "../../Components/Admins/AdminUserManagement";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../Components/Admins/AdminSidebar";

const AdminUserManagementPage = () => {
  const uid = localStorage.getItem("@secure.n.uid");
  const navigate = useNavigate();

  const BackToLogin = () => {
    navigate("/");
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

  return (
    <>
      <AdminSidebar component={<AdminUserManagement />} />
    </>
  );
};

export default AdminUserManagementPage;
