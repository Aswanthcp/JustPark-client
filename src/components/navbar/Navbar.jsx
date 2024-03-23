import { setLogout } from "../../Redux/store";
import React, { useCallback, useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Places",
    to: "/places",
  },
  {
    name: "Reservations",
    to: "/reservation",
  },
  {
    name: "about",
    to: "/about",
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const user = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = useCallback(() => {
    setShowSubMenu((prevState) => !prevState);
  }, []);

  return (
    <div className="text-gray-600 relative w-full bg-white p-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="flex items-center space-x-2">
            <span>
              <img
                src="images/logo.png"
                className="h-8 rounded-full"
                alt="Logo"
              />
            </span>
            <span className="font-bold capitilize">JUSTPARK</span>
          </div>
        </Link>
        <div className="hidden lg:block">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to} // Changed here
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {user ? (
          <>
            <div className="relative group top:1  flex items-center lg:visible invisible">
              <div className="ml-2 m-2">
                <div>{user.first_name}</div>
              </div>
              <div>
                <img
                  onClick={toggleSubMenu}
                  className="inline-block h-10 w-10 rounded-full cursor-pointer"
                  src="https://live.staticflickr.com/131/360729365_e1ae3cbe08_b.jpg"
                  alt="User Avatar"
                />

                {showSubMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg overflow-hidden shadow-md z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <div
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      onClick={() => dispatch(setLogout())}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="hidden lg:block">
            <Link to="/signup">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                SIGNUP/LOGIN
              </button>
            </Link>
          </div>
        )}

        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <img
                        src="images/logo.png"
                        className="h-8 rounded-full"
                        alt="Flowbite Logo"
                      />
                    </span>
                    <span className="font-bold">ParkBRO</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to} // Changed here
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
                {user ? (
                  <div className="mt-4">
                    <div className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50">
                      <Link
                        to="/profile"
                        className="ml-3 text-base font-medium text-gray-900"
                      >
                        Profile
                      </Link>
                    </div>
                    <button
                      onClick={() => dispatch(setLogout())}
                      type="button"
                      className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      LOGOUT
                    </button>
                  </div>
                ) : (
                  <div className="lg:hidden">
                    <Link to="/signup">
                      <button
                        type="button"
                        className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold
                        text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        SIGNUP/LOGIN
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
