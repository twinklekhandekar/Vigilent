// backend/controllers/trackerController.js
const Tracker = require('../models/Tracker');

// Demo categories for fake scanning
const categories = ['Advertising', 'Analytics', 'Social', 'Fingerprinting'];

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

exports.scanWebsite = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    // Generate fake tracker data (replace with real API if needed)
    const trackerCount = getRandomInt(5); // up to 5 trackers
    const trackers = Array.from({ length: trackerCount }).map(() => {
      const category = categories[Math.floor(Math.random() * categories.length)];
      return {
        name: category + ' Tracker',
        domain: `tracker-${getRandomInt(100)}.com`,
        category,
        infoLink: 'https://www.example.com',
      };
    });

    const cookies = {
      total: getRandomInt(10),
      essential: getRandomInt(3),
      tracking: getRandomInt(7),
    };

    const totalTrackers = trackers.length;

    const trackerData = await Tracker.create({
      scannedUrl: url,
      trackers,
      cookies,
      totalTrackers,
    });

    res.json(trackerData);
  } catch (err) {
    console.error('Tracker scan error:', err);
    res.status(500).json({ error: 'Failed to scan site' });
  }
};
