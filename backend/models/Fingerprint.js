const mongoose = require('mongoose');

const fingerprintSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  userAgent: { type: String }
});

module.exports = mongoose.model('Fingerprint', fingerprintSchema);
