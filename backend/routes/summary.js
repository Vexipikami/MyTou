const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const Sleep = require('../models/Sleep');
const Workout = require('../models/Workout');
const Meal = require('../models/Meal');

router.get('/', async (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const notes = await Note.find({ createdAt: { $gte: oneWeekAgo } });
    const sleep = await Sleep.find({ date: { $gte: oneWeekAgo } });
    const workouts = await Workout.find({ date: { $gte: oneWeekAgo } });
    const meals = await Meal.find({ date: { $gte: oneWeekAgo } });

    const avgSleepTime = sleep.length
      ? sleep.reduce((sum, s) => {
          const sleepDate = new Date(`1970-01-01T${s.sleepTime}:00`);
          const wakeDate = new Date(`1970-01-01T${s.wakeTime}:00`);
          const diff = (wakeDate - sleepDate + 1440 * 60000) % (24 * 60 * 60000); // pour gérer les heures après minuit
          return sum + diff / 60000;
        }, 0) / sleep.length
      : 0;

    const totalWorkoutsCal = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    const avgWorkoutsCalories = totalWorkoutsCal / 7;

    const totalMealsCal = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const avgMealsCalories = totalMealsCal / 7;

    res.json({
      notesCount: notes.length,
      sleepCount: sleep.length,
      workoutsCount: workouts.length,
      mealsCount: meals.length,
      avgSleepMinutes: Math.round(avgSleepTime),
      avgCaloriesBurnedPerDay: Math.round(avgWorkoutsCalories),
      avgCaloriesConsumedPerDay: Math.round(avgMealsCalories),
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors du résumé hebdomadaire' });
  }
});

module.exports = router;
