import React from "react";
import UserSidebar from "../../Components/UserSidebar";
import AppliedApplicationsForRent from "../../Components/Farmers/AppliedApplicationsForRent";

const FarmersAppliedApplicationsForRentPage = () => {
  return (
    <>
      <UserSidebar component={<AppliedApplicationsForRent />} />
    </>
  );
};

export default FarmersAppliedApplicationsForRentPage;
