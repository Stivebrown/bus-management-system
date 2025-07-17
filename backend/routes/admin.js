const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../db-json');

// Middleware to check admin JWT (mock, replace with real JWT logic)
function isAdmin(req, res, next) {
  // Example: check for a token in Authorization header
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // In real app, verify JWT and check admin role
  // For now, allow if token is present
  next();
}

router.get('/analytics', isAdmin, (req, res) => {
  const db = readDB();
  res.json({
    revenue: db.bookings.reduce((sum, b) => sum + (b.amount || 0), 0),
    occupancy: [60, 80, 90, 70, 50],
    statusCounts: {
      confirmed: db.bookings.filter(b => b.status === 'confirmed').length,
      pending: db.bookings.filter(b => b.status === 'pending').length,
      cancelled: db.bookings.filter(b => b.status === 'cancelled').length
    }
  });
});

// Get all bookings from database
router.get('/bookings', isAdmin, (req, res) => {
  const db = readDB();
  const bookings = db.bookings.map(b => ({
    id: b.id,
    name: b.name || (db.users.find(u => u.id === b.user_id) || {}).name || 'Unknown',
    phone: b.phone || '',
    email: b.email || '',
    seats: b.seats || [],
    tickets: b.tickets || 1,
    bus_type: b.bus_type || '',
    time: b.time || '',
    from: b.from_city,
    to: b.to_city,
    date: b.date,
    status: b.status,
    amount: b.amount || 0
  }));
  res.json(bookings);
});

// Get all shippings from database
router.get('/shippings', isAdmin, (req, res) => {
  const db = readDB();
  const shipments = db.shipments.map(s => ({
    id: s.id,
    sender: (db.users.find(u => u.id === s.user_id) || {}).name || 'Unknown',
    origin: s.from_city,
    destination: s.to_city,
    date: s.date || '',
    description: s.description || '',
    weight: s.weight || '',
    status: s.status,
    amount: s.amount || 0
  }));
  res.json(shipments);
});

// Update user role
router.put('/users/:id/role', isAdmin, (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.role = req.body.role;
  writeDB(db);
  res.json({ message: 'Role updated', user });
});

// Add driver/vehicle
router.post('/drivers', isAdmin, (req, res) => {
  const db = readDB();
  if (!db.drivers) db.drivers = [];
  const newDriver = { id: db.drivers.length + 1, ...req.body };
  db.drivers.push(newDriver);
  writeDB(db);
  res.status(201).json(newDriver);
});

// Delete driver/vehicle
router.delete('/drivers/:id', isAdmin, (req, res) => {
  const db = readDB();
  db.drivers = (db.drivers || []).filter(d => d.id !== parseInt(req.params.id));
  writeDB(db);
  res.json({ message: 'Driver deleted' });
});

// Update booking
router.put('/bookings/:id', isAdmin, (req, res) => {
  const db = readDB();
  const booking = db.bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  Object.assign(booking, req.body);
  writeDB(db);
  res.json({ message: 'Booking updated', booking });
});

// Delete booking
router.delete('/bookings/:id', isAdmin, (req, res) => {
  const db = readDB();
  db.bookings = db.bookings.filter(b => b.id !== parseInt(req.params.id));
  writeDB(db);
  res.json({ message: 'Booking deleted' });
});

// Update shipping
router.put('/shippings/:id', isAdmin, (req, res) => {
  const db = readDB();
  const shipping = db.shipments.find(s => s.id === parseInt(req.params.id));
  if (!shipping) return res.status(404).json({ error: 'Shipping not found' });
  Object.assign(shipping, req.body);
  writeDB(db);
  res.json({ message: 'Shipping updated', shipping });
});

// Delete shipping
router.delete('/shippings/:id', isAdmin, (req, res) => {
  const db = readDB();
  db.shipments = db.shipments.filter(s => s.id !== parseInt(req.params.id));
  writeDB(db);
  res.json({ message: 'Shipping deleted' });
});

module.exports = router;
