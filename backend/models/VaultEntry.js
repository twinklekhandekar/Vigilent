const mongoose = require('mongoose');

const vaultEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    siteName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }, // will store encrypted password
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('VaultEntry', vaultEntrySchema);
