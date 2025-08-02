const { protect } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const { getWorkouts, createWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');

router.get('/', protect, getWorkouts);
router.post('/', protect, createWorkout);
router.delete('/:id', protect, deleteWorkout);
router.put('/:id', protect, updateWorkout); 

module.exports = router;