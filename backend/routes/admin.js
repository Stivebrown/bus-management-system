const express = require('express');
const router = express.Router();

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

module.exports = router;
