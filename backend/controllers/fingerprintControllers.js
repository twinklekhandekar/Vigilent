const Fingerprint = require('../models/Fingerprint');


exports.saveFingerprint = async (req, res) => {
  try {
    const { id, data, createdAt, userAgent } = req.body;
    if (!id || !data) return res.status(400).json({ message: 'Missing fingerprint data' });

    const existing = await Fingerprint.findOne({ id });
    if (existing) return res.status(200).json({ message: 'Fingerprint already saved', fingerprint: existing });

    const fingerprint = await Fingerprint.create({ id, data, createdAt, userAgent });
    res.status(201).json({ message: 'Fingerprint saved successfully', fingerprint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFingerprints = async (req, res) => {
  try {
    const fingerprints = await Fingerprint.find().sort({ createdAt: -1 });
    res.json(fingerprints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
