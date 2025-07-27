const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const Sleep = require('../models/Sleep');
const Workout = require('../models/Workout');
const Meal = require('../models/Meal');

router.get('/', async (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [notes, sleep, workouts, meals] = await Promise.all([
    Note.find({ createdAt: { $gte: oneWeekAgo } }),
    Sleep.find({ date: { $gte: oneWeekAgo } }),
    Workout.find({ date: { $gte: oneWeekAgo } }),
    Meal.find({ date: { $gte: oneWeekAgo } }),
  ]);

  res.json({
    notesCount: notes.length,
    sleepCount: sleep.length,
    workoutsCount: workouts.length,
    mealsCount: meals.length,
  });
});

module.exports = router;
