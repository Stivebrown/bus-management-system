import React, { useEffect, useState } from "react";

const mockBookings = [
  { id: 1, from: "Buea", to: "Douala", date: "2025-07-05", status: "confirmed" },
  { id: 2, from: "Buea", to: "Yaounde", date: "2025-07-06", status: "pending" },
];

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [cancelMsg, setCancelMsg] = useState("");

  useEffect(() => {
    // Replace with real API call
    setBookings(mockBookings);
  }, []);

  useEffect(() => {
    setFiltered(
      bookings.filter(
        b =>
          b.to.toLowerCase().includes(search.toLowerCase()) ||
          b.status.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, bookings]);

  const handleCancel = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "cancelled" } : b));
    setCancelMsg("Booking cancelled.");
    setTimeout(() => setCancelMsg(""), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">My Bookings</h2>
      {cancelMsg && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{cancelMsg}</div>}
      <input
        type="text"
        className="mb-4 px-3 py-2 border rounded w-full"
        placeholder="Search by destination or status..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-blue-50">
            <th className="p-2">From</th>
            <th className="p-2">To</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(b => (
            <tr key={b.id} className="border-t">
              <td className="p-2">{b.from}</td>
              <td className="p-2">{b.to}</td>
              <td className="p-2">{b.date}</td>
              <td className="p-2 capitalize">{b.status}</td>
              <td className="p-2">
                {b.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(b.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;
