import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

import { get_parkingPlace } from "../../utils/Constants";

const ParkingPlace = ({ parkingplace }) => (
  <Link to={`/viewing/${parkingplace.id}`} className="text-blue-500">
    <div className="w-[350px] border rounded overflow-hidden shadow-md transform transition-transform hover:scale-105">
      <img
        src="https://thearchitectsdiary.com/wp-content/uploads/2020/10/Parking-101-Creating-the-Perfect-Car-Park.jpg"
        alt="Laptop"
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold capitalize">
          {parkingplace.name}
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          {parkingplace.address
            ? parkingplace.address
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturidebitis?"}
        </p>
        <p className="text-lg text-green-500 mb-2">₹50.00</p>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          View Details
        </button>
      </div>
    </div>
  </Link>
);

const ParkingPlacePage = () => {
  const [parkingplaces, setparkingplaces] = useState([]);

  useEffect(() => {
    axios
      .get(get_parkingPlace)
      .then((response) => {
        setparkingplaces(response.data);
      })
      .catch((error) => console.error("Error fetching parking lots:", error));
  }, []);
  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl text-gray-400 font-semibold  mb-5 mt-5 uppercase dark:text-white">
          Parking Places
        </h1>
        <hr className="border-gray-200" />
        <div className="m-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {parkingplaces.map((parkingplace) => (
            <ParkingPlace key={parkingplace.id} parkingplace={parkingplace} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ParkingPlacePage;
