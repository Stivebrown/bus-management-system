const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../db-json');

// Get all shipments
router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.shipments);
});

// Create a new shipment
router.post('/', (req, res) => {
  const { user_id, from_city, to_city, description, weight, date } = req.body;
  if (!user_id || !from_city || !to_city || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const db = readDB();
  const newShipment = {
    id: db.shipments.length + 1,
    user_id,
    from_city,
    to_city,
    description: description || '',
    weight: weight || '',
    date,
    status: 'pending'
  };
  db.shipments.push(newShipment);
  writeDB(db);
  res.status(201).json(newShipment);
});

module.exports = router;
