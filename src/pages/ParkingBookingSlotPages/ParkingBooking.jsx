import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import {
  create_Checkout_Session,
  create_bookingSlot_byuser,
  getParkSlotbyId,
  getParkingSLotby_PlaceId_SlotNumber,
} from "../../utils/Constants";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ParkingBooking = () => {
  const navigate = useNavigate();
  const { placeId, slotNumber } = useParams();
  console.log(slotNumber);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.client);
  const [parkingSlot, setParkingSlot] = useState({});
  const [paymentMode, setPaymentMode] = useState("razorpay");

  const handleError = (error) => {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "Network error. Please try again later.";
    toast.error(errorMessage, {
      position: "top-right",
    });
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      paymentMode === "cod"
        ? await handleCODCheckout()
        : await handleRazorpayCheckout();
    } catch (error) {
      handleError(error);
    }
  };

  const handleRazorpayCheckout = async () => {
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

  const handleCODCheckout = async () => {
    try {
      const formData = {
        user: user,
        slot: parkingSlot,
        payment_id: "COD",
        car_number: document.getElementById("car-number").value,
        car_details: document.getElementById("car-details").value,
        reservation_time: document.getElementById("parking-time").value,
        payment_mode: "COD",
      };
      await axios.post(`${create_bookingSlot_byuser}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
      toast.success("Booking Successful!", { position: "top-right" });
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
        payment_mode: "razorpay",
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
          toast.success("Booking Successful!", { position: "top-right" });
        })
        .catch((error) => {
          console.error("error occured");
        });
    } catch (error) {
      // Update the local state to reflect the payment status
      handleError(error);
    }
  };
  useEffect(() => {
    axios
      .get(`${getParkingSLotby_PlaceId_SlotNumber}${placeId}/${slotNumber}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setParkingSlot(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parking slots:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-1 m-6">
      {/* Left side: Booking Form */}
      <div className="col-span-4">
        {parkingSlot.place && (
          <form
            className="max-w-3xl mx-auto p-4 rounded shadow-xl w-90%"
            onSubmit={handleCheckout}
          >
            {/* Form elements */}
            <div className="px-4 sm:px-0">
              <h3 className="text-xl font-semibold leading-7 text-gray-900">
                Applicant Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Car details and application.
              </p>
            </div>

            <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mb-5 border-b border-gray-300">
              <div className="flex flex-col py-3 border-b border-gray-300">
                <dt className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Plot name
                </dt>
                <dd className="text-gray-500 text-sm">
                  {parkingSlot.place.name}
                </dd>
              </div>
              <div className="flex flex-col py-3 border-b border-gray-300">
                <dt className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Slot Number
                </dt>
                <dd className="text-gray-500 text-sm">
                  {parkingSlot.slot_number}
                </dd>
              </div>
              <div className="flex flex-col py-3 border-b border-gray-300">
                <dt className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </dt>
                <dd className="text-gray-500 text-sm">
                  {parkingSlot.place.address}
                </dd>
              </div>
            </dl>

            <div className="mb-6">
              <label
                htmlFor="car-number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Car Number
              </label>
              <input
                type="text"
                id="car-number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="KL-01-D-2535"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="car-details"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Car Details
              </label>
              <input
                type="text"
                id="car-details"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Benz G-wagon"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="parking-time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Parking Hours
              </label>
              <input
                type="text"
                id="parking-time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="2"
                required
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment-mode"
                  value="razorpay"
                  checked={paymentMode === "razorpay"}
                  onChange={() => setPaymentMode("razorpay")}
                  className="mr-2"
                />
                Razorpay
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment-mode"
                  value="cod"
                  checked={paymentMode === "cod"}
                  onChange={() => setPaymentMode("cod")}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
            >
              Book
            </button>
          </form>
        )}
      </div>

      {/* Right side: Pricing */}
      <div className="col-span-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        {/* Pricing details */}
      </div>
    </div>
  );
};

export default ParkingBooking;
