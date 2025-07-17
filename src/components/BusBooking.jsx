import React, { useState } from "react";
import busLogo from "../assets/bus.svg";
import bookingImg from "../assets/busseats.jpg";

const BusBooking = () => {
  const cities = [
    { name: "Douala", price: 5000 },
    { name: "Yaounde", price: 6000 },
    { name: "Bamenda", price: 7000 },
    { name: "Bafoussam", price: 6500 },
    { name: "Limbe", price: 4000 },
    { name: "Kribi", price: 8000 },
    { name: "Ebolowa", price: 8500 },
    { name: "Ngaoundere", price: 12000 },
    { name: "Garoua", price: 15000 },
    { name: "Maroua", price: 17000 }
  ];
  const [form, setForm] = useState({
    to: "",
    date: "",
    time: "",
    busType: "70-seater",
    seats: "",
    tickets: 1,
    name: "",
    phone: "",
    email: ""
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [seatWarning, setSeatWarning] = useState("");

  // ...existing code...

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value
    });
    // If relevant field changes, fetch booked seats
    if (["to", "date", "time", "busType"].includes(name)) {
      const nextForm = {
        ...form,
        [name]: type === "number" ? Number(value) : value
      };
      fetchBookedSeats(nextForm);
    }
    // If seats field changes, check for conflicts
    if (name === "seats") {
      checkSeatConflict(value, bookedSeats);
    }
  };

  const fetchBookedSeats = async (formData) => {
    
    if (!formData.to || !formData.date || !formData.time || !formData.busType) {
      setBookedSeats([]);
      return;
    }
    try {
      const res = await fetch(`/api/booked-seats?to=${encodeURIComponent(formData.to)}&date=${encodeURIComponent(formData.date)}&time=${encodeURIComponent(formData.time)}&busType=${encodeURIComponent(formData.busType)}`);
      if (!res.ok) throw new Error("Failed to fetch booked seats");
      const data = await res.json();
      setBookedSeats(data.seats || []);
      // Check for seat conflict if seats already entered
      if (formData.seats) {
        checkSeatConflict(formData.seats, data.seats || []);
      }
    } catch (err) {
      setBookedSeats([]);
    }
  };

  const checkSeatConflict = (seatsStr, booked) => {
    const enteredSeats = seatsStr.split(',').map(s => s.trim()).filter(Boolean);
    const conflicts = enteredSeats.filter(s => booked.includes(s));
    if (conflicts.length > 0) {
      setSeatWarning(`Seat(s) already booked: ${conflicts.join(", ")}`);
    } else {
      setSeatWarning("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("You must be logged in to book a bus.");
      const city = cities.find(c => c.name === form.to);
      const amount = city ? city.price * form.tickets : 0;
      // Parse seats as array, trim whitespace, filter empty
      const seatsArr = form.seats.split(',').map(s => s.trim()).filter(Boolean);
      if (seatsArr.length !== form.tickets) {
        setError(`Please enter exactly ${form.tickets} seat number(s), separated by commas.`);
        return;
      }
      // Check for seat conflicts before submitting
      const conflicts = seatsArr.filter(s => bookedSeats.includes(s));
      if (conflicts.length > 0) {
        setError(`Seat(s) already booked: ${conflicts.join(", ")}`);
        return;
      }
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          from_city: "Buea",
          to_city: form.to,
          date: form.date,
          time: form.time,
          bus_type: form.busType,
          seats: seatsArr,
          tickets: form.tickets,
          amount,
          name: form.name,
          phone: form.phone,
          email: form.email
        })
      });
      if (!res.ok) throw new Error("Booking failed");
      setSuccess(true);
      setShowPayment(true);
      // Don't reset form yet, wait for payment
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setShowPayment(false);
    setForm({ to: "", date: "", time: "", busType: "70-seater", seats: "", tickets: 1, name: "", phone: "", email: "" });
    setPaymentMethod("");
    alert("Payment successful! Your booking is confirmed.");
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-8">
      <div className="w-full max-w-2xl p-8 bg-white/90 rounded-3xl shadow-2xl border border-blue-100 relative animate-fadeIn">
        {/* Booking illustration image */}
        <img src={bookingImg} alt="Booking Illustration" className="w-full object-cover rounded-2xl mb-6" />
        <div className="flex flex-col items-center mb-6">
          <img src={busLogo} alt="Bus Logo" className="w-20 h-20 drop-shadow-md mb-2" />
          <span className="text-3xl font-extrabold text-blue-800 tracking-tight">Book a Ticket</span>
        </div>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center font-semibold shadow">{error}</div>}
        {seatWarning && <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded-lg text-center font-semibold shadow">{seatWarning}</div>}
        {!showPayment ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold text-blue-700">Full Name</label>
                <input type="text" name="name" className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition" placeholder="Enter your full name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-700">Phone Number</label>
                <input type="tel" name="phone" className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition" placeholder="e.g. 6XX XXX XXX" value={form.phone} onChange={handleChange} required />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-700">Email</label>
                <input type="email" name="email" className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition" placeholder="e.g. you@email.com" value={form.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-700">From</label>
                <input type="text" className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-blue-50 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition" value="Buea" disabled />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-700">Destination</label>
                <select name="to" className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition" value={form.to} onChange={handleChange} required>
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city.name} value={city.name}>{city.name} ({city.price.toLocaleString()} XAF)</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-700">Date</label>
                <input type="date" name="date" className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition" value={form.date} onChange={handleChange} required />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-700">Time</label>
                <input type="time" name="time" className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition" value={form.time} onChange={handleChange} required />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-700">Bus Type</label>
                <select name="busType" className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition" value={form.busType} onChange={handleChange} required>
                  <option value="70-seater">70 Seater</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-700">Seat Number(s)</label>
                <input
                  type="text"
                  name="seats"
                  className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  placeholder="e.g. 12A, 12B for multiple tickets"
                  value={form.seats}
                  onChange={handleChange}
                  required
                />
                <span className="text-xs text-blue-600">Separate multiple seats with commas. Enter exactly as many as number of tickets.</span>
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-700">Number of Tickets</label>
                <input type="number" name="tickets" min="1" max="70" className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition" value={form.tickets} onChange={handleChange} required />
              </div>
              <div className="flex items-end">
                <span className="text-lg font-bold text-blue-700">Total: {(() => {
                  const city = cities.find(c => c.name === form.to);
                  return city ? (city.price * form.tickets).toLocaleString() : 0;
                })()} XAF</span>
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold text-lg shadow-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-200 transform hover:-translate-y-1">Book Now</button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handlePayment}>
            <div className="text-center font-bold text-xl text-blue-700 mb-2">Payment</div>
            <div>
              <label className="block mb-1 font-semibold text-blue-700">Select Payment Method</label>
              <select className="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} required>
                <option value="">Choose...</option>
                <option value="mtn">MTN Mobile Money</option>
                <option value="orange">Orange Money</option>
                <option value="express">Express Union</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>
            {paymentMethod && (
              <div className="bg-blue-50 p-3 rounded-lg text-blue-700 text-center mb-2 font-semibold shadow">
                Payment via {paymentMethod === 'mtn' ? 'MTN Mobile Money' : paymentMethod === 'orange' ? 'Orange Money' : paymentMethod === 'express' ? 'Express Union' : 'Card'} (simulated)
              </div>
            )}
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-400 text-white font-bold text-lg shadow-lg hover:from-green-700 hover:to-green-500 transition-all duration-200 transform hover:-translate-y-1">Pay & Confirm</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BusBooking;
