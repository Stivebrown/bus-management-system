const express = require('express');
const router = express.Router();
const db = require('../db');

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
  // Example analytics data
  res.json({
    revenue: 120000,
    occupancy: [60, 80, 90, 70, 50],
    statusCounts: { confirmed: 12, pending: 3, cancelled: 2 }
  });
});

// Get all bookings from database
router.get('/bookings', isAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT b.id, u.name as user, b.from_city as from, b.to_city as to, b.date, b.status, 0 as amount
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      ORDER BY b.id DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get all shippings from database
router.get('/shippings', isAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.id, u.name as sender, s.from_city as origin, s.to_city as destination, s.created_at as date, s.status, 0 as amount
      FROM shipments s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.id DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch shippings' });
  }
});

module.exports = router;
