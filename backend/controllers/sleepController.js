const Sleep = require('../models/Sleep');

exports.getSleeps = async (req, res) => {
  try {
    const sleeps = await Sleep.find();
    res.json(sleeps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSleep = async (req, res) => {
  try {
    const newSleep = new Sleep(req.body);
    await newSleep.save();
    res.status(201).json(newSleep);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
