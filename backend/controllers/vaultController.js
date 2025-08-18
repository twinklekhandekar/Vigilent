const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const VaultEntry = require('../models/VaultEntry');
const User = require('../models/User');


const ENCRYPTION_KEY_RAW = process.env.VAULT_SECRET || 'supersecretkey123456'; 
const ENCRYPTION_KEY = Buffer.from(ENCRYPTION_KEY_RAW.padEnd(32, '0').slice(0, 32)); // 32 chars
const IV_LENGTH = 16;


function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptSafe(text) {
  try {
    if (!text) return '';
    const parts = text.split(':');
    if (parts.length !== 2) return '';
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = Buffer.from(parts[1], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (err) {
    console.error('Decrypt error:', err.message);
    return '';
  }
}


const verifyVault = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid vault password' });
    }

    return res.json({ success: true, message: 'Vault unlocked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const addEntry = async (req, res) => {
  try {
    const { siteName, username, password } = req.body;

    if (!siteName || !username || !password) {
      return res.status(400).json({ message: 'siteName, username, and password are required' });
    }

    const encryptedPassword = encrypt(password);

    const entry = new VaultEntry({
      user: req.user.id,
      siteName,
      username,
      password: encryptedPassword,
    });

    await entry.save();
    res.json({ success: true, entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving entry' });
  }
};


const getEntries = async (req, res) => {
  try {
    const entries = await VaultEntry.find({ user: req.user.id });

    const decryptedEntries = entries.map(e => ({
      _id: e._id.toString(),
      siteName: e.siteName,
      username: e.username,
      password: decryptSafe(e.password),
      createdAt: e.createdAt,
    }));

    res.json(decryptedEntries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching entries' });
  }
};


const deleteEntry = async (req, res) => {
  try {
    const entryId = req.params.id;

    const deleted = await VaultEntry.findOneAndDelete({
      _id: entryId,
      user: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.json({ success: true, message: 'Entry deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting entry' });
  }
};

module.exports = {
  verifyVault,
  addEntry,
  getEntries,
  deleteEntry
};
