const express = require('express');
const router = express.Router();
const { getSleeps, createSleep, deleteSleep, updateSleep } = require('../controllers/sleepController');

router.get('/', getSleeps);
router.post('/', createSleep);
router.delete('/:id', deleteSleep);
router.put('/:id', updateSleep); 

module.exports = router;