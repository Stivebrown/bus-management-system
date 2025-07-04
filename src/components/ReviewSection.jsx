import React from "react";

const ReviewSection = () => (
  <section className="max-w-3xl mx-auto my-12 p-6 bg-white dark:bg-gray-900 rounded shadow">
    <h2 className="text-2xl font-bold mb-4 text-blue-700">What Our Customers Say</h2>
    <div className="space-y-6">
      <div className="border-l-4 border-blue-700 pl-4">
        <p className="italic">"Booking was super easy and the bus was on time. Highly recommend!"</p>
        <span className="block mt-2 font-semibold text-blue-600">— Linda E.</span>
      </div>
      <div className="border-l-4 border-blue-700 pl-4">
        <p className="italic">"The shipping service is fast and reliable. I tracked my package in real time!"</p>
        <span className="block mt-2 font-semibold text-blue-600">— Samuel T.</span>
      </div>
      <div className="border-l-4 border-blue-700 pl-4">
        <p className="italic">"Great customer support and very clean buses. Will use again."</p>
        <span className="block mt-2 font-semibold text-blue-600">— Marie B.</span>
      </div>
    </div>
  </section>
);

export default ReviewSection;
