import React from "react";

const Hero = () => (
  <section className="bg-gradient-to-br from-blue-50 to-blue-200 py-20 px-4 text-center">
    <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 mb-6">
      Welcome to Buea Bus & Shipping Service
    </h1>
    <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
      Book your bus trips and ship goods from Buea to any city with ease. Fast, reliable, and secure service for the Buea community.
    </p>
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <a href="/book" className="px-8 py-3 bg-blue-700 text-white rounded shadow hover:bg-blue-800 transition">Book a Bus</a>
      <a href="/ship" className="px-8 py-3 bg-white text-blue-700 border border-blue-700 rounded shadow hover:bg-blue-50 transition">Ship Goods</a>
    </div>
  </section>
);

export default Hero;
