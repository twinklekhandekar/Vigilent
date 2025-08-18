const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { verifyVault, addEntry, getEntries, deleteEntry } = require('../controllers/vaultController');

router.post('/verify', authMiddleware, verifyVault);
router.post('/add', authMiddleware, addEntry);
router.get('/entries', authMiddleware, getEntries);
router.delete('/delete/:id', authMiddleware, deleteEntry);

module.exports = router;
