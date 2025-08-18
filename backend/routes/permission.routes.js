// routes/permission.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  getPermissions,
  addPermission,
  deletePermission,
  togglePermission
} = require('../controllers/permissionController');

router.get('/',authMiddleware, getPermissions);
router.post('/',authMiddleware, addPermission);
router.delete('/:id',authMiddleware, deletePermission);
router.patch('/:id',authMiddleware, togglePermission);

module.exports = router;
