import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidemenu = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block w-full">
      <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
        <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

        <Link
          to="/profile"
          className={`flex items-center px-3 py-2.5 font-bold text-indigo-900 ${
            isActive("/profile") && " bg-white border rounded-full"
          }`}
        >
          Public Profile
        </Link>
        <Link
          to="/reservation"
          className={`flex items-center px-3 py-2.5 font-semibold text-indigo-900 hover:border hover:rounded-full ${
            isActive("/reservation") && " bg-white border rounded-full"
          }`}
        >
          Reservations
        </Link>
      </div>
    </aside>
  );
};

export default Sidemenu;
