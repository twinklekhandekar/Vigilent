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
app.use(cors());
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use("/api/breach", breachRoutes);
app.use('/api/fake-emails', fakeEmailRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/tracker', trackerRoutes);
app.use('/api/vault', vaultRoutes);






module.exports = app