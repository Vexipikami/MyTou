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

exports.deleteSleep = async (req, res) => {
  try {
    await Sleep.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression du sommeil' });
  }
};

exports.updateSleep = async (req, res) => {
  try {
    const sleep = await Sleep.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(sleep);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du sommeil' });
  }
};