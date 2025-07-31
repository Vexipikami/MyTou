const express = require('express');
const router = express.Router();
const { getSleeps, createSleep, deleteSleep } = require('../controllers/sleepController');

router.get('/', getSleeps);
router.post('/', createSleep);
router.delete('/:id', deleteSleep);

module.exports = router;