// backend/models/Tracker.js
const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
  scannedUrl: { type: String, required: true },
  totalTrackers: { type: Number, default: 0 },
  cookies: {
    total: { type: Number, default: 0 },
    essential: { type: Number, default: 0 },
    tracking: { type: Number, default: 0 },
  },
  trackers: [
    {
      name: String,
      domain: String,
      category: String,
      infoLink: String,
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tracker', trackerSchema);
