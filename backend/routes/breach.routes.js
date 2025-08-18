
const express = require("express");
const { checkEmailBreach } = require("../controllers/breachController");
const router = express.Router();


router.post("/check", checkEmailBreach);

module.exports = router;
