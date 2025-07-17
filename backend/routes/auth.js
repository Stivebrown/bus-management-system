const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../db-json');

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const db = readDB();
  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  const newUser = {
    id: db.users.length + 1,
    name,
    email,
    password // In production, hash the password!
  };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json({ message: 'User registered', user: newUser });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // Return a mock token
  res.json({ token: 'jwt-token-placeholder', user });
});

module.exports = router;
