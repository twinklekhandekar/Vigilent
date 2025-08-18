const mongoose = require('mongoose');

const fakeEmailSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    
  },


  { timestamps: true }
);

module.exports = mongoose.model('FakeEmail', fakeEmailSchema);

