import React, { useEffect, useState } from "react";
import Header from "../Header";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../API/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NR99USFBsMizJtqkTEVzg5NH5krlCPORUl2YLORi7ZfwmINPiYXFE33nHAoDMymOE5XByoIchUj7GnsrG7J1ZNB00Bv8WPufs"
);

const PaymentManagement = () => {
  const decryptedUID = secureLocalStorage.getItem("uid");
  const [jobsData, setJobData] = useState([]);
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    const fetchAppliedApplications = async () => {
      try {
        const res = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/farmers/fetchFarmersAcceptedApplications`,
          { decryptedUID }
        );
        if (res.status === 200) {
          setJobData(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppliedApplications();
  }, [decryptedUID]);

  const handleCheckout = async (jobTitle, wageSalary) => {
    const stripe = await stripePromise;

    const lineItems = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: jobTitle,
          },
          unit_amount: parseInt(wageSalary * 100),
        },
        quantity: 1,
      },
    ];

    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/farmers/create-checkout-session`,
        {
          lineItems,
          decryptedUID,
        }
      );

      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        setPaymentError(result.error.message);
      }
    } catch (error) {
      console.log(error);
      setPaymentError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Header pageName="Payment Management" />
      <div className="container-fluid p-3 border mt-5 border-dark border-1 rounded-5">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="text-center">
              <tr>
                <th className="px-5">Sr No.</th>
                <th className="px-5">Job Title</th>
                <th className="px-5">Job Description</th>
                <th className="px-5">Start Date</th>
                <th className="px-5">End Date</th>
                <th className="px-5">Working Hours</th>
                <th className="px-5">Wage Salary</th>
                <th className="px-5">Labourer Name</th>
                <th className="px-5">Labourer Email</th>
                <th className="px-5">Labourer Phone No.</th>
                <th className="px-5">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {jobsData.map((job, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{job.jobtitle}</td>
                  <td>{job.jobdescription}</td>
                  <td>{new Date(job.startdate).toDateString()}</td>
                  <td>{new Date(job.enddate).toDateString()}</td>
                  <td>{job.workinghours} / Per Day</td>
                  <td>{job.wagesalary} / Per Day</td>
                  <td>{job.user_name}</td>
                  <td>{job.user_email}</td>
                  <td>{job.user_phone_number}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleCheckout(job.jobtitle, job.wagesalary)
                      }
                    >
                      Pay
                    </button>
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

export default PaymentManagement;
