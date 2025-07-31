const express = require('express');
const router = express.Router();
const { getWorkouts, createWorkout, deleteWorkout } = require('../controllers/workoutController');

router.get('/', getWorkouts);
router.post('/', createWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;