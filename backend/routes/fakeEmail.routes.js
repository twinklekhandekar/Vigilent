const express = require('express');
const router = express.Router();
const { listEmails, generateEmail, deleteEmail } = require('../controllers/fakeEmailcontroller');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/list',authMiddleware, listEmails);
router.post('/generate',authMiddleware, generateEmail);
router.delete('/:id',authMiddleware, deleteEmail);

module.exports = router;
