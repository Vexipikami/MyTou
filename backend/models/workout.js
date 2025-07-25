const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: String,
  duration: Number, // en minutes
  caloriesBurned: Number,
  exercises: [String],
});

module.exports = mongoose.model('Workout', workoutSchema);
