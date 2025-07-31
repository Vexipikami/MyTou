const express = require('express');
const router = express.Router();
const { getWorkouts, createWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');

router.get('/', getWorkouts);
router.post('/', createWorkout);
router.delete('/:id', deleteWorkout);
router.put('/:id', updateWorkout); 

module.exports = router;