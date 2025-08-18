// controllers/permissionController.js
const Permission = require('../models/Permission');

// Get all sites
const getPermissions = async (req, res) => {
  try {
    const sites = await Permission.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch permissions' });
  }
};

// Add new site
const addPermission = async (req, res) => {
  try {
    const newSite = await Permission.create({
      user: req.user.id,   // associate this permission with the logged-in user
      ...req.body
    });
    res.json(newSite);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add site' });
  }
};

// Delete site
const deletePermission = async (req, res) => {
  try {
    await Permission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Site deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete site' });
  }
};

// Toggle a permission
const togglePermission = async (req, res) => {
  const { field } = req.body; // field: "camera"|"microphone"|"location"|"contacts"
  if (!["camera", "microphone", "location", "contacts"].includes(field)) {
    return res.status(400).json({ message: 'Invalid field' });
  }
  try {
    const site = await Permission.findById(req.params.id);
    if (!site) return res.status(404).json({ message: 'Site not found' });

    site[field] = !site[field];
    await site.save();
    res.json(site);
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle permission' });
  }
};

module.exports = {
  getPermissions,
  addPermission,
  deletePermission,
  togglePermission
};
