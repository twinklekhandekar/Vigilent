const express = require('express');
const router = express.Router();
const { saveFingerprint, getFingerprints } = require('../controllers/fingerprintController');

router.post('/', saveFingerprint);
router.get('/', getFingerprints); // optional, can be removed if not needed

module.exports = router;
