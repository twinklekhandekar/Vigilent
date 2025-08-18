// backend/routes/tracker.routes.js
const express = require('express');
const router = express.Router();
const { scanWebsite } = require('../controllers/trackerController');

router.post('/scan', scanWebsite);

module.exports = router;
