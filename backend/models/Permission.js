// models/Permission.js
const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  camera: { type: Boolean, default: false },
  microphone: { type: Boolean, default: false },
  location: { type: Boolean, default: false },
  contacts: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Permission', permissionSchema);
