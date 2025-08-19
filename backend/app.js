const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const breachRoutes = require("./routes/breach.routes");
const fakeEmailRoutes = require('./routes/fakeEmail.routes');
const permissionRoutes = require('./routes/permission.routes');
const trackerRoutes = require('./routes/tracker.routes');
const vaultRoutes = require('./routes/vault.routes');

dotenv.config();
const app = express()

const allowedOrigins = [
  ...process.env.FRONTEND_URLS.split(',').map(url => url.trim()), // split multiple URLs
  'http://localhost:5173',
  'http://localhost:4173'
];

  


app.use(cors({
    origin(origin, cb) {
        if (!origin) return cb(null, true); // allow REST tools / same origin
        return allowedOrigins.includes(origin)
          ? cb(null, true)
          : cb(new Error(`CORS blocked: ${origin}`));
      },
      credentials: true
}));



app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).json({ ok: true, uptime: process.uptime() });
  });


app.use('/api/auth', authRoutes);
app.use("/api/breach", breachRoutes);
app.use('/api/fake-emails', fakeEmailRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/tracker', trackerRoutes);
app.use('/api/vault', vaultRoutes);






module.exports = app