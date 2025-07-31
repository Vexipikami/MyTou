const Meal = require('../models/Meal');

exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMeal = async (req, res) => {
  try {
    const newMeal = new Meal(req.body);
    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression du repas' });
  }
};

exports.updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du repas' });
  }
};