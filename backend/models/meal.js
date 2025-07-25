const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: String,
  ingredients: [String],
  prepTime: Number,
  calories: Number,
});

module.exports = mongoose.model('Meal', mealSchema);
