import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./LandingPage";

import BusBooking from "./components/BusBooking";
import AdminDashboard from "./components/AdminDashboard";
import Profile from "./components/Profile";
import AdminLogin from "./components/AdminLogin";
import Register from "./components/Register";
import Login from "./components/Login";
import BookingHistory from "./components/BookingHistory";

import { ToastProvider } from "./components/ToastProvider";
import LiveChat from "./components/LiveChat";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <ToastProvider>
      <Router>
        <LiveChat />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/book" element={<BusBooking />} />
              <Route path="/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/bookings" element={<BookingHistory />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
