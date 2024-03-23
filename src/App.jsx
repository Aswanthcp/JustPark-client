import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { useSelector } from "react-redux";

import ParkingSlot from "./pages/ParkingSlotPage/ParkingSlot";
import ParkingBooking from "./pages/ParkingBookingSlotPages/ParkingBooking";
import Login from "./pages/Login/Login";
import Signup from "./pages/signup/Signup";
import ReservationPage from "./pages/Reservation_page/ReservationPage";
import Footer from "./components/footer/Footer";
import Home from "./pages/landingPage/Home";
import ParkingPlacePage from "./pages/parkingPlacesPages/ParkingPlace";
import UserProfile from "./pages/userProfile/UserProfile";
import { ToastContainer } from "react-toastify";
import AboutMePage from "./pages/Misc/AboutMePage";

function App() {
  const token = useSelector((state) => state.token);
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="content h-vh bg-gray-40">
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/places" exact element={<ParkingPlacePage />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/aboutme" exact element={<AboutMePage />} />
          <Route
            path="/profile"
            exact
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewing/:id"
            exact
            element={
              <ProtectedRoute>
                <ParkingSlot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:placeId/:slotNumber"
            exact
            element={
              <ProtectedRoute>
                <ParkingBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservation"
            exact
            element={
              <ProtectedRoute>
                <ReservationPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <hr className="my-8  border-gray-200" />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
