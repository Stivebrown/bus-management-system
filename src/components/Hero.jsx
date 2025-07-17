import React from "react";
import { NavLink } from "react-router-dom";
import bookingImg from "../assets/booking.png";

const Hero = () => (
  <section
    className="relative py-20 px-4 text-center min-h-[400px] flex flex-col justify-center items-center overflow-hidden"
    style={{
      backgroundImage: `linear-gradient(rgba(59,130,246,0.10), rgba(59,130,246,0.10)), url(${bookingImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Dark overlay for text visibility */}
    <div className="absolute inset-0 bg-black/50 z-0" aria-hidden="true"></div>
    <div className="relative z-10 w-full flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
        Welcome to Buea Bus Booking Service
      </h1>
      <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-2xl">
        Book your bus trips from Buea to any city with ease. Fast, reliable, and secure service for the Buea community.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <NavLink to="/book" className="px-8 py-3 bg-blue-700 text-white rounded shadow hover:bg-blue-800 transition">Book a Bus</NavLink>
      </div>
    </div>
  </section>
);

export default Hero;
