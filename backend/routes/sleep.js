const { protect } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const { getSleeps, createSleep, deleteSleep, updateSleep } = require('../controllers/sleepController');

router.get('/', protect, getSleeps);
router.post('/', protect, createSleep);
router.delete('/:id', protect, deleteSleep);
router.put('/:id', protect, updateSleep); 

module.exports = router;