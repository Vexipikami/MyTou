const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  sleepTime: { type: String, required: true },
  wakeTime: { type: String, required: true },
  comment: String,
});

module.exports = mongoose.model('Sleep', sleepSchema);
