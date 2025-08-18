// backend/routes/breach.routes.js
const express = require("express");
const { checkEmailBreach } = require("../controllers/breachController");
const router = express.Router();

// POST /api/breach/check
router.post("/check", checkEmailBreach);

module.exports = router;
