import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { get_parkingPlace } from "../../utils/Constants";

import.meta.env.google_map_api;

const ParkingPlace = ({ parkingplace }) => (
  <Link to={`/viewing/${parkingplace.id}`} className="text-blue-500">
    <div className="border rounded overflow-hidden shadow-md transform transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img
          src="https://thearchitectsdiary.com/wp-content/uploads/2020/10/Parking-101-Creating-the-Perfect-Car-Park.jpg"
          alt="Parking Place Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{parkingplace.name}</h2>
        <p className="text-lg text-green-500 mb-2">₹50.00</p>
        <p className="text-gray-700">{parkingplace.description}</p>
        <button className="btn-blue mt-4">View Details</button>
      </div>
    </div>
  </Link>
);

const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "300px" };
const center = { lat: 9.9312, lng: 76.2673 };

const Home = () => {
  const [parkingplaces, setparkingplaces] = useState([]);

  useEffect(() => {
    axios
      .get(`${get_parkingPlace}`)
      .then((response) => {
        setparkingplaces(response.data);
      })
      .catch((error) => console.error("Error fetching parking lots:", error));
  }, []);
  return (
    <>
      <div className="p-4">
        <div className="mb-4">
          <LoadScript
            googleMapsApiKey={import.meta.env.google_map_api}
            libraries={libraries}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
            ></GoogleMap>
          </LoadScript>
        </div>
        <h1 className="text-3xl text-gray-400 font-semibold  mb-5 mt-5 uppercase dark:text-white">
          Parking Places
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {parkingplaces.map((parkingplace) => (
            <ParkingPlace key={parkingplace.id} parkingplace={parkingplace} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
