import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import {
  create_Checkout_Session,
  create_bookingSlot_byuser,
  getParkSlotbyId,
} from "../../utils/Constants";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import.meta.env.RAZORPAY_KEY_ID;

const renderInfoItem = (label, value) => (
  <div className="flex flex-col py-3 border-b border-gray-300">
    <dt className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </dt>
    <dd className="text-gray-500 text-sm">{value}</dd>
  </div>
);

const handleError = (error) => {
  const errorMessage =
    error.response && error.response.data.message
      ? error.response.data.message
      : "Network error. Please try again later.";
  toast.error(errorMessage, {
    position: "top-right",
  });
};

const renderInput = (id, label, placeholder, required) => (
  <div className="mb-6">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <input
      type="text"
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const ParkingBooking = () => {
  const navigate = useNavigate();
  const [parkingSlot, setParkingSlots] = useState({});
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.client);
  const { id } = useParams();

  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(create_Checkout_Session, {
        amount: 1,
        name: parkingSlot.name,
      });

      const { payment } = response.data;
      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        amount: payment.amount,
        currency: payment.currency,
        name: payment.name,
        description: payment.description,
        order_id: payment.order_id,
        handler: async function (response) {
          try {
            await updatePaymentStatus(response.razorpay_payment_id);
            toast.success("Payment successful!", {
              position: "top-right",
            });
          } catch (error) {
            handleError(error);
          }
        },
        prefill: {
          name: "Aswanth C P",
          email: "cpaswanthpalayad@gmail.com",
          contact: "9447176508",
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      handleError(error);
    }
  };
  const updatePaymentStatus = async (paymentId) => {
    try {
      const carNumber = document.getElementById("car-number").value;
      const carDetails = document.getElementById("car-details").value;
      const parkingTime = document.getElementById("parking-time").value;

      const formData = {
        user: user,
        slot: parkingSlot,
        payment_id: paymentId,
        car_number: carNumber,
        car_details: carDetails,
        reservation_time: parkingTime,
      };
      axios
        .post(`${create_bookingSlot_byuser}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.error("error occured");
        });
    } catch (error) {
      // Update the local state to reflect the payment status
      handleError(error);
    }
  };

  const pricingInfo = {
    hourlyRate: 50,
  };

  useEffect(() => {
    axios
      .get(`${getParkSlotbyId}${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setParkingSlots(response.data);
      })
      .catch((error) => console.error("Error fetching parking lots:", error));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-1 m-6">
      <div className="col-span-4">
        {parkingSlot.place && parkingSlot.place.name && (
          <form
            className="max-w-3xl mx-auto p-4 rounded shadow-xl w-90%"
            onSubmit={handleCheckout}
          >
            <div className="px-4 sm:px-0">
              <h3 className="text-xl font-semibold leading-7 text-gray-900">
                Applicant Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Car details and application.
              </p>
            </div>

            <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mb-5 border-b border-gray-300">
              {renderInfoItem("Plot name", parkingSlot.place.name)}
              {renderInfoItem("Slot Number", parkingSlot.slot_number)}
              {renderInfoItem("Address", parkingSlot.place.address)}
            </dl>

            {renderInput("car-number", "Car Number", "KL-01-D-2535", true)}
            {renderInput("car-details", "Car Details", "Benz G-wagon", true)}
            {renderInput("parking-time", "Parking Hours", "2", true)}

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Book
            </button>
          </form>
        )}
      </div>
      {/* Right side: Pricing */}
      <div className="col-span-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Pricing Information
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 dark:text-gray-400">Hourly Rate:</span>
          <span className="text-blue-600 dark:text-blue-500">
            ${pricingInfo.hourlyRate} per hour
          </span>
        </div>
      </div>
    </div>
  );
};

export default ParkingBooking;
