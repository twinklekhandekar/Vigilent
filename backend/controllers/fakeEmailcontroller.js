const FakeEmail = require('../models/FakeEmail');
const { customAlphabet } = require('nanoid');




const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
const domains = ['mailinator.com', 'tempmail.net', 'dispostable.com'];


function generateRandomEmail() {
    const prefix = nanoid(10);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${prefix}@${domain}`;
  }

const listEmails = async (req, res) => {
  try {
    const emails = await FakeEmail.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ emails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch emails' });
  }
};

// Generate new fake email
const generateEmail = async (req, res) => {
  try {


    const newEmail = `${nanoid()}@fakeemail.com`;
    const emailDoc = await FakeEmail.create({ email: newEmail, user: req.user.id  });
    res.json({ email: emailDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate email' });
  }
};


const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    await FakeEmail.findByIdAndDelete({ _id: id, user: req.user.id });
    res.json({ message: 'Email deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete email' });
  }
};

module.exports = {
  listEmails,
  generateEmail,
  deleteEmail,
  generateRandomEmail
};


