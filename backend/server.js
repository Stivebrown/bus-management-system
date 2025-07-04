const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const shipmentRoutes = require('./routes/shipments');
const adminRoutes = require('./routes/admin');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Buea Bus & Shipping Service API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
