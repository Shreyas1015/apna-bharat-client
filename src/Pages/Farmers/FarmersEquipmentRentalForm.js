import React from "react";
import UserSidebar from "../../Components/UserSidebar";
import EquipmentRentalForm from "../../Components/Farmers/EqipmentRentalForm";

const FarmersEquipmentRentalForm = () => {
  return (
    <>
      <UserSidebar component={<EquipmentRentalForm />} />
    </>
  );
};

export default FarmersEquipmentRentalForm;
