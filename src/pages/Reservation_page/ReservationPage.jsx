import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import { getReservations } from "../../utils/Constants";
import Sidemenu from "../../components/sidemenu/sidemenu";

const ReservationPage = () => {
  const user = useSelector((state) => state.client);
  const token = useSelector((state) => state.token);
  const [reservation, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${getReservations}${user.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setReservation(response.data);
      })
      .catch((error) => console.error("Error fetching reservations:", error))
      .finally(() => setLoading(false));
  }, []);

  const formatReservationTime = (timeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(timeString).toLocaleString(undefined, options);
  };

  return (
    <div class="w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <Sidemenu />
      <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <h1 className="text-3xl text-gray-400 font-semibold  mb-5 mt-5 uppercase dark:text-white">
          Reservation Page
        </h1>

        {loading ? (
          <p>Loading reservations...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Place</th>
                <th className="py-2 px-4 border-b">Slot Number</th>
                <th className="py-2 px-4 border-b">Reservation Time</th>
                <th className="py-2 px-4 border-b">User Name</th>
                <th className="py-2 px-4 border-b">Car Number</th>
                <th className="py-2 px-4 border-b">Car Details</th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {reservation.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50 text-center">
                  <td className="py-2 px-4 border-b">{res.slot.place.name}</td>
                  <td className="py-2 px-4 border-b">{res.slot.slot_number}</td>
                  <td className="py-2 px-4 border-b">
                    {formatReservationTime(res.reservation_time)}
                  </td>
                  <td className="py-2 px-4 border-b">{user.first_name}</td>
                  <td className="py-2 px-4 border-b">{res.car_number}</td>
                  <td className="py-2 px-4 border-b">{res.car_details}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleCancelReservation(res.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
