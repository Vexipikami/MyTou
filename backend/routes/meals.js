const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

router.get('/', async (req, res) => {
  const meals = await Meal.find();
  res.json(meals);
});

router.post('/', async (req, res) => {
  const newMeal = new Meal(req.body);
  await newMeal.save();
  res.status(201).json(newMeal);
});

module.exports = router;
