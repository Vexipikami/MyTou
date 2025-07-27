const express = require('express');
const router = express.Router();
const { getSleeps, createSleep } = require('../controllers/sleepController');

router.get('/', getSleeps);
router.post('/', createSleep);

module.exports = router;