const express = require('express');
const router = express.Router();

// Get all bookings (placeholder)
router.get('/', (req, res) => {
  res.json([{ id: 1, from: 'Buea', to: 'Douala', date: '2025-07-05' }]);
});

// Create a new booking (placeholder)
router.post('/', (req, res) => {
  res.json({ message: 'Booking created (placeholder)' });
});

module.exports = router;
