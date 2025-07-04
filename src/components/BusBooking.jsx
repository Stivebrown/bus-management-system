import React, { useState } from "react";

const BusBooking = () => {
  const [form, setForm] = useState({ to: "", date: "", time: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate booking API call
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Book a Bus</h2>
      {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">Booking successful! Confirmation sent.</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">From</label>
          <input type="text" className="w-full border rounded px-3 py-2" value="Buea" disabled />
        </div>
        <div>
          <label className="block mb-1 font-medium">To</label>
          <input type="text" name="to" className="w-full border rounded px-3 py-2" placeholder="Destination city" value={form.to} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input type="date" name="date" className="w-full border rounded px-3 py-2" value={form.date} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Time</label>
          <input type="time" name="time" className="w-full border rounded px-3 py-2" value={form.time} onChange={handleChange} required />
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">Book Now</button>
      </form>
    </div>
  );
};

export default BusBooking;
