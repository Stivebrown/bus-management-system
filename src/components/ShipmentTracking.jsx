import React, { useEffect, useState } from "react";

const mockShipments = [
  { id: 1, from: "Buea", to: "Douala", status: "in_transit", updated: "2025-07-04 10:00" },
  { id: 2, from: "Buea", to: "Yaounde", status: "delivered", updated: "2025-07-03 15:00" },
];

const statusSteps = ["pending", "in_transit", "delivered"];

const ShipmentTracking = () => {
  const [shipments, setShipments] = useState([]);
  useEffect(() => {
    // Replace with real API call
    setShipments(mockShipments);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">My Shipments</h2>
      {shipments.map(s => (
        <div key={s.id} className="mb-6 p-4 border rounded bg-blue-50">
          <div className="mb-2 font-medium">From: {s.from} &rarr; To: {s.to}</div>
          <div className="mb-2">Last Update: {s.updated}</div>
          <div className="flex items-center space-x-2">
            {statusSteps.map((step, idx) => (
              <div key={step} className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${s.status === step || statusSteps.indexOf(s.status) > idx ? 'bg-blue-700' : 'bg-gray-300'}`}></div>
                {idx < statusSteps.length - 1 && <div className="w-8 h-1 bg-gray-300 mx-1"></div>}
              </div>
            ))}
            <span className="ml-2 capitalize text-sm text-blue-700">{s.status.replace('_', ' ')}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShipmentTracking;
