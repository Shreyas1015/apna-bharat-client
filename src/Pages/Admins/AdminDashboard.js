import React from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../Components/Admins/AdminSidebar";
import AdminDashboardContent from "../../Components/Admins/AdminDashboardContent";

const AdminDashboard = () => {
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
      <AdminSidebar component={<AdminDashboardContent />} />
    </>
  );
};

export default AdminDashboard;
