import React from "react";
import UserSidebar from "../../Components/UserSidebar";
import LabourerManagement from "../../Components/Farmers/LabourerManagement";

const FarmersLabourerManagementPage = () => {
    
  return (
    <>
      <UserSidebar component={<LabourerManagement />} />
    </>
  );
};

export default FarmersLabourerManagementPage;
