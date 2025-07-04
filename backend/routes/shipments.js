const express = require('express');
const router = express.Router();

// Get all shipments (placeholder)
router.get('/', (req, res) => {
  res.json([{ id: 1, from: 'Buea', to: 'Yaounde', status: 'In Transit' }]);
});

// Create a new shipment (placeholder)
router.post('/', (req, res) => {
  res.json({ message: 'Shipping request created (placeholder)' });
});

module.exports = router;
