import React, { useState } from "react";

const ShippingRequest = () => {
  const [form, setForm] = useState({ to: "", description: "", weight: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate shipping API call
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Request Shipping</h2>
      {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">Shipping request submitted! Confirmation sent.</div>}
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
          <label className="block mb-1 font-medium">Description of Goods</label>
          <textarea name="description" className="w-full border rounded px-3 py-2" placeholder="Describe your goods" value={form.description} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Weight (kg)</label>
          <input type="number" name="weight" className="w-full border rounded px-3 py-2" placeholder="Weight" value={form.weight} onChange={handleChange} required min="0.1" step="0.1" />
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">Request Shipping</button>
      </form>
    </div>
  );
};

export default ShippingRequest;
