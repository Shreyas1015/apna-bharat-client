import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import RefreshTokenModal from "./Components/RefreshTokenModal";
import UserProfilePage from "./Pages/UserProfilePage";
// import Loading from "./Components/Loading";
import { useEffect, useState } from "react";
// import axiosInstance from "./API/axiosInstance";
import FarmersProfilePage from "./Pages/Farmers/FarmersProfilePage";
import FarmersJobPostingPage from "./Pages/Farmers/FarmersJobPostingPage";
import FarmersProductsSalePage from "./Pages/Farmers/FarmersProductsSalePage";
import FarmersMarketSalesPage from "./Pages/Farmers/FarmersMarketSalesPage";
import FarmersEquipmentRentalPage from "./Pages/Farmers/FarmersEquipmentRentalPage";
import LaboursProfilePage from "./Pages/Labours/LaboursProfilePage";
import LaboursJobListingPage from "./Pages/Labours/LaboursJobListingPage";
import LaboursEquipmentRenalsPage from "./Pages/Labours/LaboursEquipmentRenalsPage";
import ResidentReportIssuePage from "./Pages/Residents/ResidentReportIssuePage";
import FarmersJobFormPage from "./Pages/Farmers/FarmersJobFormPage";
import FarmersJobEditPage from "./Pages/Farmers/FarmersJobEditPage";
import FarmersAppliedApplicationPage from "./Pages/Farmers/FarmersAppliedApplicationPage";
import FarmersLabourerManagementPage from "./Pages/Farmers/FarmersLabourerManagementPage";
import FarmersPaymentManagementPage from "./Pages/Farmers/FarmersPaymentManagementPage";
import SuccessPage from "./Pages/SuccessPage";
import FarmersEquipmentRentalForm from "./Pages/Farmers/FarmersEquipmentRentalForm";
import FarmersEquipmentEditPage from "./Pages/Farmers/FarmersEquipmentEditPage";
import FarmersAppliedApplicationsForRentPage from "./Pages/Farmers/FarmersAppliedApplicationsForRentPage";
import FarmersRentedProductsPage from "./Pages/Farmers/FarmersRentedProductsPage";
import AdminDashboard from "./Pages/Admins/AdminDashboard";
import AdminUserManagementPage from "./Pages/Admins/AdminUserManagementPage";
import AdminIssueManagementPage from "./Pages/Admins/AdminIssueManagementPage";
import IssueManagmentPage from "./Pages/Residents/IssueManagmentPage";

const App = () => {
  // const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // useEffect(() => {
  //   // Request Interceptor
  //   axiosInstance.interceptors.request.use(
  //     (config) => {
  //       setLoading(true);
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );

  //   // Response Interceptor
  //   axiosInstance.interceptors.response.use(
  //     (response) => {
  //       setLoading(false);
  //       return response;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );
  // }, []);

  return (
    <>
      {isMobile === true ? (
        <div
          style={{
            textAlign: "center",
            padding: "10px",
            background: "#ffcccb",
          }}
        >
          For a better experience, please view this website on a desktop.
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            {/* User Section */}
            <Route path="/user-profile" element={<UserProfilePage />} />
            <>
              {/* Farmer */}
              <Route
                path="/farmers/farmers-profile"
                element={<FarmersProfilePage />}
              />
              <Route
                path="/farmers/farmers-job-posting"
                element={<FarmersJobPostingPage />}
              />
              <Route
                path="/farmers/farmers-products-sale"
                element={<FarmersProductsSalePage />}
              />
              <Route
                path="/farmers/farmers-market-sales"
                element={<FarmersMarketSalesPage />}
              />
              <Route
                path="/farmers/farmers-equipment-rental"
                element={<FarmersEquipmentRentalPage />}
              />
              <Route
                path="/farmers/job-form"
                element={<FarmersJobFormPage />}
              />
              <Route
                path="/farmers/edit-job-form"
                element={<FarmersJobEditPage />}
              />
              <Route
                path="/farmers/edit-equipment-form"
                element={<FarmersEquipmentEditPage />}
              />
              <Route
                path="/farmers/applied-applications"
                element={<FarmersAppliedApplicationPage />}
              />
              <Route
                path="/farmers/requested-applications-for-rent"
                element={<FarmersAppliedApplicationsForRentPage />}
              />

              <Route
                path="/farmers/labourer-management"
                element={<FarmersLabourerManagementPage />}
              />

              <Route
                path="/farmers/payment-management"
                element={<FarmersPaymentManagementPage />}
              />
              <Route
                path="/farmers/equipment-rental-form"
                element={<FarmersEquipmentRentalForm />}
              />
              <Route
                path="/farmers/rented-products-data"
                element={<FarmersRentedProductsPage />}
              />
              <Route path="/farmers/success" element={<SuccessPage />} />
              {/* Labour */}
              <Route
                path="/labours/labours-profile"
                element={<LaboursProfilePage />}
              />
              <Route
                path="/labours/labours-job-listing"
                element={<LaboursJobListingPage />}
              />
              <Route
                path="/labours/labours-equipment-rentals"
                element={<LaboursEquipmentRenalsPage />}
              />
              {/* Resident */}
              <Route
                path="/residents/residents-report-issue"
                element={<ResidentReportIssuePage />}
              />
              <Route
                path="/residents/residents-issue-management"
                element={<IssueManagmentPage />}
              />
            </>

            {/* Admin Section */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin-user-management"
              element={<AdminUserManagementPage />}
            />
            <Route
              path="/admin-issue-management"
              element={<AdminIssueManagementPage />}
            />

            <Route path="/refreshToken" element={<RefreshTokenModal />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
