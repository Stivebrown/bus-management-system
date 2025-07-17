const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../db-json');

// Get booked seats for a specific route/date/time/busType
router.get('/booked-seats', (req, res) => {
  const { to, date, time, busType } = req.query;
  if (!to || !date || !time || !busType) {
    return res.status(400).json({ error: 'Missing required query params' });
  }
  const db = readDB();
  // Find all bookings for this route/date/time/busType
  const seats = db.bookings
    .filter(b => b.to_city === to && b.date === date && b.time === time && b.bus_type === busType)
    .flatMap(b => Array.isArray(b.seats) ? b.seats : []);
  res.json({ seats });
});

// Get all bookings
router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.bookings);
});

// Create a new booking
router.post('/', (req, res) => {
  const { user_id, from_city, to_city, date, time, bus_type, seats, tickets, amount, name, phone, email } = req.body;
  if (!user_id || !from_city || !to_city || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const db = readDB();
  // Prevent double-booking of seats
  const requestedSeats = Array.isArray(seats) ? seats : [];
  const alreadyBooked = db.bookings
    .filter(b => b.to_city === to_city && b.date === date && b.time === time && b.bus_type === bus_type)
    .flatMap(b => Array.isArray(b.seats) ? b.seats : []);
  const conflicts = requestedSeats.filter(s => alreadyBooked.includes(s));
  if (conflicts.length > 0) {
    return res.status(409).json({ error: `Seat(s) already booked: ${conflicts.join(", ")}` });
  }
  const newBooking = {
    id: db.bookings.length + 1,
    user_id,
    from_city,
    to_city,
    date,
    time,
    bus_type: bus_type || '',
    seats: requestedSeats,
    tickets: tickets || 1,
    amount: amount || 0,
    name: name || '',
    phone: phone || '',
    email: email || '',
    status: 'pending'
  };
  db.bookings.push(newBooking);
  writeDB(db);
  res.status(201).json(newBooking);
});

module.exports = router;
