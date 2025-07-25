const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

router.get('/', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/', async (req, res) => {
  const newWorkout = new Workout(req.body);
  await newWorkout.save();
  res.status(201).json(newWorkout);
});

module.exports = router;
